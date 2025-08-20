# 📋 Contrats API - Café Comptoir

## Frontend-Backend Integration Protocol

### 🎯 Données actuellement mockées dans `mockData.js`
- `restaurantInfo` : Informations du restaurant
- `menuItems` : Liste des plats du menu  
- `reviews` : Avis clients
- `galleryImages` : Images de la galerie
- `aboutText` : Texte à propos

### 🔌 APIs à implémenter

#### 1. **Réservations** (`/api/reservations`)
```json
POST /api/reservations
Body: {
  "date": "2025-01-15",
  "time": "19:30", 
  "guests": "4",
  "firstName": "Sophie",
  "lastName": "Martin",
  "phone": "+33 6 12 34 56 78",
  "email": "sophie@email.com",
  "message": "Anniversaire"
}
Response: {
  "success": true,
  "reservation": { ...reservation object with id },
  "message": "Réservation confirmée"
}
```

```json
GET /api/reservations
Response: [{ ...reservations list }]
```

#### 2. **Contact** (`/api/contact`)
```json
POST /api/contact  
Body: {
  "name": "Jean Dupont",
  "email": "jean@email.com",
  "subject": "Question sur le menu",
  "message": "Bonjour..."
}
Response: {
  "success": true,
  "message": "Message envoyé avec succès"
}
```

#### 3. **Avis clients** (`/api/reviews`)
```json
GET /api/reviews
Response: [
  {
    "id": "1",
    "name": "Sophie L.",
    "rating": 5,
    "comment": "Un vrai régal...",
    "date": "2025-01-10"
  }
]
```

```json
POST /api/reviews
Body: {
  "name": "Marie D.",
  "rating": 5,
  "comment": "Excellent restaurant !",
  "email": "marie@email.com" (optional)
}
```

#### 4. **Menu items** (`/api/menu`)
```json
GET /api/menu
Response: [
  {
    "id": 1,
    "name": "Pavé de rumsteck grillé à la plancha",
    "description": "avec pommes de terre rôties...",
    "price": "22€",
    "category": "Plats principaux",
    "available": true
  }
]
```

### 🗄️ Collections MongoDB

#### `reservations`
- `_id`: ObjectId
- `date`: String
- `time`: String  
- `guests`: String
- `firstName`: String
- `lastName`: String
- `phone`: String
- `email`: String
- `message`: String (optional)
- `status`: String (pending, confirmed, cancelled)
- `createdAt`: DateTime

#### `contacts`
- `_id`: ObjectId
- `name`: String
- `email`: String
- `subject`: String
- `message`: String
- `status`: String (new, read, responded)
- `createdAt`: DateTime

#### `reviews`
- `_id`: ObjectId
- `name`: String
- `rating`: Number (1-5)
- `comment`: String
- `email`: String (optional)
- `approved`: Boolean
- `createdAt`: DateTime

#### `menu_items`
- `_id`: ObjectId
- `name`: String
- `description`: String
- `price`: String
- `category`: String
- `available`: Boolean
- `image_url`: String (optional)

### 🔗 Intégration Frontend

#### Fichiers à modifier:
1. **Reservation.js** : Remplacer mock par vraie API
2. **Reviews.js** : Charger avis depuis API
3. **Menu.js** : Charger menu depuis API  
4. **Ajouter ContactForm** : Nouveau formulaire de contact

#### Services API à créer:
```javascript
// services/api.js
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const reservationAPI = {
  create: (data) => axios.post(`${API_BASE}/reservations`, data),
  getAll: () => axios.get(`${API_BASE}/reservations`)
};

export const contactAPI = {
  send: (data) => axios.post(`${API_BASE}/contact`, data)  
};

export const reviewsAPI = {
  getAll: () => axios.get(`${API_BASE}/reviews`),
  create: (data) => axios.post(`${API_BASE}/reviews`, data)
};

export const menuAPI = {
  getAll: () => axios.get(`${API_BASE}/menu`)
};
```

### ✅ Plan d'implémentation

1. **Backend Models** : Créer modèles Pydantic
2. **Database Setup** : Initialiser collections  
3. **API Endpoints** : Implémenter toutes les routes
4. **Frontend Integration** : Connecter aux vraies APIs
5. **Error Handling** : Gestion d'erreurs robuste
6. **Testing** : Test complet du flux
7. **Email Notifications** : Confirmations (optionnel)

### 🎯 Objectif final
- Frontend fonctionnel avec vraies données
- Formulaire de réservation opérationnel 
- Système de contact fonctionnel
- Gestion des avis clients
- Base de données persistante