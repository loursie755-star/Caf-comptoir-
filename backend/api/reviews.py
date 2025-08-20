from fastapi import APIRouter, HTTPException
from models import Review, ReviewCreate, SuccessResponse
from database import get_collection
from typing import List
import logging

router = APIRouter(prefix="/reviews", tags=["reviews"])
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[Review])
async def get_reviews(approved_only: bool = True):
    """Récupérer tous les avis clients"""
    try:
        collection = await get_collection('reviews')
        
        # Filtrer par statut d'approbation si demandé
        filter_query = {"approved": True} if approved_only else {}
        
        reviews = await collection.find(filter_query).sort("createdAt", -1).to_list(1000)
        
        return [Review(**review) for review in reviews]
        
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des avis: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.post("/", response_model=SuccessResponse)
async def create_review(review_data: ReviewCreate):
    """Créer un nouvel avis client"""
    try:
        # Créer l'objet avis
        review = Review(**review_data.dict())
        
        # Sauvegarder en base
        collection = await get_collection('reviews')
        result = await collection.insert_one(review.dict())
        
        if result.inserted_id:
            logger.info(f"Nouvel avis créé: {review.id} par {review.name}")
            return SuccessResponse(
                message="Votre avis a été publié avec succès ! Merci pour votre retour.",
                data={
                    "review_id": review.id,
                    "name": review.name,
                    "rating": review.rating
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Erreur lors de la création de l'avis")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la création de l'avis: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.get("/{review_id}", response_model=Review)
async def get_review(review_id: str):
    """Récupérer un avis par ID"""
    try:
        collection = await get_collection('reviews')
        review = await collection.find_one({"id": review_id})
        
        if not review:
            raise HTTPException(status_code=404, detail="Avis non trouvé")
            
        return Review(**review)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la récupération de l'avis: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.patch("/{review_id}/approve")
async def approve_review(review_id: str, approved: bool = True):
    """Approuver ou rejeter un avis"""
    try:
        collection = await get_collection('reviews')
        result = await collection.update_one(
            {"id": review_id},
            {"$set": {"approved": approved}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Avis non trouvé")
            
        status = "approuvé" if approved else "rejeté"
        return SuccessResponse(
            message=f"Avis {status} avec succès"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de l'approbation de l'avis: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.delete("/{review_id}")
async def delete_review(review_id: str):
    """Supprimer un avis"""
    try:
        collection = await get_collection('reviews')
        result = await collection.delete_one({"id": review_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Avis non trouvé")
            
        logger.info(f"Avis supprimé: {review_id}")
        return SuccessResponse(
            message="Avis supprimé avec succès"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la suppression de l'avis: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")