from fastapi import APIRouter, HTTPException
from models import Contact, ContactCreate, SuccessResponse, ErrorResponse
from database import get_collection
from typing import List
import logging

router = APIRouter(prefix="/contact", tags=["contact"])
logger = logging.getLogger(__name__)

@router.post("/", response_model=SuccessResponse)
async def send_contact_message(contact_data: ContactCreate):
    """Envoyer un message de contact"""
    try:
        # Créer l'objet contact
        contact = Contact(**contact_data.dict())
        
        # Sauvegarder en base
        collection = await get_collection('contacts')
        result = await collection.insert_one(contact.dict())
        
        if result.inserted_id:
            logger.info(f"Nouveau message de contact reçu: {contact.id} de {contact.name}")
            return SuccessResponse(
                message="Votre message a été envoyé avec succès ! Nous vous recontacterons rapidement.",
                data={
                    "contact_id": contact.id,
                    "name": contact.name,
                    "subject": contact.subject
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Erreur lors de l'envoi du message")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de l'envoi du message de contact: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.get("/", response_model=List[Contact])
async def get_contact_messages():
    """Récupérer tous les messages de contact (pour l'administration)"""
    try:
        collection = await get_collection('contacts')
        contacts = await collection.find().sort("createdAt", -1).to_list(1000)
        
        return [Contact(**contact) for contact in contacts]
        
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des messages de contact: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.get("/{contact_id}", response_model=Contact)
async def get_contact_message(contact_id: str):
    """Récupérer un message de contact par ID"""
    try:
        collection = await get_collection('contacts')
        contact = await collection.find_one({"id": contact_id})
        
        if not contact:
            raise HTTPException(status_code=404, detail="Message de contact non trouvé")
            
        return Contact(**contact)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la récupération du message de contact: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.patch("/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    """Mettre à jour le statut d'un message de contact"""
    try:
        valid_statuses = ["new", "read", "responded"]
        if status not in valid_statuses:
            raise HTTPException(
                status_code=400,
                detail=f"Statut invalide. Utilisez: {', '.join(valid_statuses)}"
            )
        
        collection = await get_collection('contacts')
        result = await collection.update_one(
            {"id": contact_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Message de contact non trouvé")
            
        return SuccessResponse(
            message=f"Statut du message mis à jour: {status}"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la mise à jour du statut: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")