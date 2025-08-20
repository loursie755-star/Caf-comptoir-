from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

# ===== RESERVATION MODELS =====
class ReservationCreate(BaseModel):
    date: str
    time: str
    guests: str
    firstName: str
    lastName: str
    phone: str
    email: EmailStr
    message: Optional[str] = ""

class Reservation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: str
    time: str
    guests: str
    firstName: str
    lastName: str
    phone: str
    email: str
    message: Optional[str] = ""
    status: str = "pending"  # pending, confirmed, cancelled
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# ===== CONTACT MODELS =====
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    status: str = "new"  # new, read, responded
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# ===== REVIEW MODELS =====
class ReviewCreate(BaseModel):
    name: str
    rating: int = Field(ge=1, le=5)
    comment: str
    email: Optional[EmailStr] = None

class Review(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    rating: int = Field(ge=1, le=5)
    comment: str
    email: Optional[str] = None
    approved: bool = True  # Auto-approuvé par défaut
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# ===== MENU MODELS =====
class MenuItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: str
    category: str
    available: bool = True
    image_url: Optional[str] = None

class MenuItemCreate(BaseModel):
    name: str
    description: str
    price: str
    category: str
    available: bool = True
    image_url: Optional[str] = None

# ===== RESPONSE MODELS =====
class SuccessResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[dict] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[str] = None

# ===== RESTAURANT INFO MODEL =====
class RestaurantInfo(BaseModel):
    name: str = "Café Comptoir"
    slogan: str = "Le rendez-vous des bons vivants à Montbrison"
    address: str = "14 Boulevard de la Madeleine, 42600 Montbrison, France"
    phone: str = "+33 4 77 58 46 77"
    email: str = "cafecomptoirmontbrison@gmail.com"
    socialMedia: dict = {
        "instagram": "@cafecomptoirmontbrison",
        "facebook": "Café Comptoir Montbrison"
    }
    openingHours: dict = {
        "monday": "12h00 - 14h00",
        "tuesday": "12h00 - 14h00",
        "wednesday": "Fermé",
        "thursday": "12h00 - 14h00", 
        "friday": "12h00 - 14h00 • 19h00 - 22h00",
        "saturday": "12h00 - 14h00 • 19h00 - 22h00",
        "sunday": "Fermé"
    }
    closureInfo: str = "Fermeture annuelle : du 17 août au 31 août 2025"