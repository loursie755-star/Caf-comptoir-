from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import API routers and database functions
from api import reservations, contact, reviews, menu
from database import init_database, close_database
from models import RestaurantInfo

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'cafe_comptoir')]

# Create the main app without a prefix
app = FastAPI(
    title="Café Comptoir API",
    description="API pour le restaurant Café Comptoir à Montbrison",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models for backwards compatibility
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Basic routes
@api_router.get("/")
async def root():
    return {
        "message": "API Café Comptoir - Montbrison",
        "restaurant": "Café Comptoir",
        "location": "Montbrison, France",
        "status": "operational"
    }

@api_router.get("/info", response_model=RestaurantInfo)
async def get_restaurant_info():
    """Récupérer les informations du restaurant"""
    return RestaurantInfo()

# Legacy status routes (for backwards compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include all API routers
api_router.include_router(reservations.router)
api_router.include_router(contact.router)
api_router.include_router(reviews.router) 
api_router.include_router(menu.router)

# Include the main router in the app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db():
    """Initialize database on startup"""
    await init_database()
    logger.info("Database initialized successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on shutdown"""
    await close_database()
    client.close()
    logger.info("Database connections closed")
