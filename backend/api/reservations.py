from fastapi import APIRouter, HTTPException
from models import Reservation, ReservationCreate, SuccessResponse, ErrorResponse
from database import get_collection
from typing import List
import logging
from datetime import datetime

router = APIRouter(prefix="/reservations", tags=["reservations"])
logger = logging.getLogger(__name__)

@router.post("/", response_model=SuccessResponse)
async def create_reservation(reservation_data: ReservationCreate):
    """Créer une nouvelle réservation"""
    try:
        # Validation de la date
        try:
            reservation_date = datetime.strptime(reservation_data.date, "%Y-%m-%d")
            if reservation_date.date() < datetime.now().date():
                raise HTTPException(
                    status_code=400,
                    detail="La date de réservation ne peut pas être dans le passé"
                )
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail="Format de date invalide. Utilisez YYYY-MM-DD"
            )

        # Créer l'objet réservation
        reservation = Reservation(**reservation_data.dict())
        
        # Sauvegarder en base
        collection = await get_collection('reservations')
        result = await collection.insert_one(reservation.dict())
        
        if result.inserted_id:
            logger.info(f"Nouvelle réservation créée: {reservation.id}")
            return SuccessResponse(
                message="Réservation confirmée avec succès ! Nous vous contacterons pour confirmer.",
                data={
                    "reservation_id": reservation.id,
                    "date": reservation.date,
                    "time": reservation.time,
                    "guests": reservation.guests,
                    "name": f"{reservation.firstName} {reservation.lastName}"
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Erreur lors de la création de la réservation")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la création de la réservation: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.get("/", response_model=List[Reservation])
async def get_reservations():
    """Récupérer toutes les réservations"""
    try:
        collection = await get_collection('reservations')
        reservations = await collection.find().to_list(1000)
        
        return [Reservation(**reservation) for reservation in reservations]
        
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des réservations: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.get("/{reservation_id}", response_model=Reservation)
async def get_reservation(reservation_id: str):
    """Récupérer une réservation par ID"""
    try:
        collection = await get_collection('reservations')
        reservation = await collection.find_one({"id": reservation_id})
        
        if not reservation:
            raise HTTPException(status_code=404, detail="Réservation non trouvée")
            
        return Reservation(**reservation)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la récupération de la réservation: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.patch("/{reservation_id}/status")
async def update_reservation_status(reservation_id: str, status: str):
    """Mettre à jour le statut d'une réservation"""
    try:
        valid_statuses = ["pending", "confirmed", "cancelled"]
        if status not in valid_statuses:
            raise HTTPException(
                status_code=400,
                detail=f"Statut invalide. Utilisez: {', '.join(valid_statuses)}"
            )
        
        collection = await get_collection('reservations')
        result = await collection.update_one(
            {"id": reservation_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Réservation non trouvée")
            
        return SuccessResponse(
            message=f"Statut de la réservation mis à jour: {status}"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la mise à jour du statut: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")