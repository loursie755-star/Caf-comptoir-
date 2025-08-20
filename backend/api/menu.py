from fastapi import APIRouter, HTTPException
from models import MenuItem, MenuItemCreate, SuccessResponse
from database import get_collection
from typing import List, Optional
import logging

router = APIRouter(prefix="/menu", tags=["menu"])
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[MenuItem])
async def get_menu_items(category: Optional[str] = None, available_only: bool = True):
    """Récupérer tous les éléments du menu"""
    try:
        collection = await get_collection('menu_items')
        
        # Construire le filtre
        filter_query = {}
        if available_only:
            filter_query["available"] = True
        if category:
            filter_query["category"] = category
        
        menu_items = await collection.find(filter_query).to_list(1000)
        
        return [MenuItem(**item) for item in menu_items]
        
    except Exception as e:
        logger.error(f"Erreur lors de la récupération du menu: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.get("/categories")
async def get_menu_categories():
    """Récupérer toutes les catégories du menu"""
    try:
        collection = await get_collection('menu_items')
        categories = await collection.distinct("category")
        
        return {"categories": categories}
        
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des catégories: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.get("/{item_id}", response_model=MenuItem)
async def get_menu_item(item_id: str):
    """Récupérer un élément du menu par ID"""
    try:
        collection = await get_collection('menu_items')
        item = await collection.find_one({"id": item_id})
        
        if not item:
            raise HTTPException(status_code=404, detail="Élément du menu non trouvé")
            
        return MenuItem(**item)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la récupération de l'élément du menu: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.post("/", response_model=SuccessResponse)
async def create_menu_item(item_data: MenuItemCreate):
    """Créer un nouvel élément du menu (pour l'administration)"""
    try:
        # Créer l'objet menu item
        menu_item = MenuItem(**item_data.dict())
        
        # Sauvegarder en base
        collection = await get_collection('menu_items')
        result = await collection.insert_one(menu_item.dict())
        
        if result.inserted_id:
            logger.info(f"Nouvel élément de menu créé: {menu_item.id}")
            return SuccessResponse(
                message="Élément du menu créé avec succès",
                data={
                    "item_id": menu_item.id,
                    "name": menu_item.name,
                    "category": menu_item.category
                }
            )
        else:
            raise HTTPException(status_code=500, detail="Erreur lors de la création de l'élément")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la création de l'élément du menu: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.patch("/{item_id}/availability")
async def update_item_availability(item_id: str, available: bool):
    """Mettre à jour la disponibilité d'un élément du menu"""
    try:
        collection = await get_collection('menu_items')
        result = await collection.update_one(
            {"id": item_id},
            {"$set": {"available": available}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Élément du menu non trouvé")
            
        status = "disponible" if available else "indisponible"
        return SuccessResponse(
            message=f"Élément du menu marqué comme {status}"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la mise à jour de la disponibilité: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.put("/{item_id}", response_model=SuccessResponse)
async def update_menu_item(item_id: str, item_data: MenuItemCreate):
    """Mettre à jour un élément du menu"""
    try:
        collection = await get_collection('menu_items')
        
        # Préparer les données de mise à jour
        update_data = item_data.dict()
        
        result = await collection.update_one(
            {"id": item_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Élément du menu non trouvé")
            
        return SuccessResponse(
            message="Élément du menu mis à jour avec succès"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la mise à jour de l'élément du menu: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@router.delete("/{item_id}")
async def delete_menu_item(item_id: str):
    """Supprimer un élément du menu"""
    try:
        collection = await get_collection('menu_items')
        result = await collection.delete_one({"id": item_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Élément du menu non trouvé")
            
        logger.info(f"Élément du menu supprimé: {item_id}")
        return SuccessResponse(
            message="Élément du menu supprimé avec succès"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de la suppression de l'élément du menu: {e}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")