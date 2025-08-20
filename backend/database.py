from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from models import MenuItem, Review
import os
import logging

logger = logging.getLogger(__name__)

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db: AsyncIOMotorDatabase = client[os.environ.get('DB_NAME', 'cafe_comptoir')]

# Collection names
COLLECTIONS = {
    'reservations': 'reservations',
    'contacts': 'contacts', 
    'reviews': 'reviews',
    'menu_items': 'menu_items'
}

async def init_database():
    """Initialize database with sample data if needed"""
    try:
        # Check if menu items exist
        menu_count = await db[COLLECTIONS['menu_items']].count_documents({})
        
        if menu_count == 0:
            logger.info("Initializing menu items...")
            sample_menu_items = [
                {
                    "id": "1",
                    "name": "Pavé de rumsteck grillé à la plancha",
                    "description": "avec pommes de terre rôties et légumes frais de saison",
                    "price": "22€",
                    "category": "Plats principaux",
                    "available": True
                },
                {
                    "id": "2", 
                    "name": "Cuisse de canard confite",
                    "description": "gratin de crozets aux chanterelles et légumes du marché",
                    "price": "24€",
                    "category": "Plats principaux",
                    "available": True
                },
                {
                    "id": "3",
                    "name": "Filet de féra du lac Léman",
                    "description": "sauce citronnée, légumes croquants et pommes vapeur",
                    "price": "26€", 
                    "category": "Poissons",
                    "available": True
                },
                {
                    "id": "4",
                    "name": "Feuillet fondant au reblochon et morilles",
                    "description": "salade verte et pommes de terre sautées à l'ail",
                    "price": "19€",
                    "category": "Spécialités",
                    "available": True
                },
                {
                    "id": "5",
                    "name": "Menu Enfant",
                    "description": "Tagliatelles, nuggets de poulet fermier, glace surprise",
                    "price": "12€",
                    "category": "Enfants",
                    "available": True
                }
            ]
            
            await db[COLLECTIONS['menu_items']].insert_many(sample_menu_items)
            logger.info(f"Inserted {len(sample_menu_items)} menu items")

        # Check if reviews exist
        review_count = await db[COLLECTIONS['reviews']].count_documents({})
        
        if review_count == 0:
            logger.info("Initializing sample reviews...")
            sample_reviews = [
                {
                    "id": "1",
                    "name": "Sophie L.",
                    "rating": 5,
                    "comment": "Un vrai régal, plats copieux et ambiance conviviale ! L'équipe est aux petits soins.",
                    "approved": True,
                    "createdAt": "2024-12-01T12:00:00"
                },
                {
                    "id": "2",
                    "name": "Marc D.",
                    "rating": 5, 
                    "comment": "Le meilleur restaurant français de Montbrison, je recommande vivement. Les produits sont frais et locaux.",
                    "approved": True,
                    "createdAt": "2024-11-20T14:30:00"
                },
                {
                    "id": "3",
                    "name": "Isabelle R.",
                    "rating": 4,
                    "comment": "Excellente cuisine traditionnelle, service chaleureux. Parfait pour un déjeuner en famille.",
                    "approved": True,
                    "createdAt": "2024-12-10T19:15:00"
                },
                {
                    "id": "4",
                    "name": "Jean-Pierre M.",
                    "rating": 5,
                    "comment": "Une adresse incontournable ! La cuisse de canard confite est un délice.",
                    "approved": True,
                    "createdAt": "2024-12-15T13:45:00"
                }
            ]
            
            await db[COLLECTIONS['reviews']].insert_many(sample_reviews)
            logger.info(f"Inserted {len(sample_reviews)} sample reviews")

        logger.info("Database initialization completed")
        
    except Exception as e:
        logger.error(f"Error initializing database: {e}")

async def close_database():
    """Close database connection"""
    client.close()

# Database utility functions
async def get_collection(collection_name: str):
    """Get a collection by name"""
    return db[COLLECTIONS.get(collection_name, collection_name)]