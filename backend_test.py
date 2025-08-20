#!/usr/bin/env python3
"""
Tests complets pour les APIs du restaurant Café Comptoir
Test des endpoints FastAPI avec MongoDB
"""

import requests
import json
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv('/app/frontend/.env')

# Configuration de l'URL du backend
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE_URL = f"{BACKEND_URL}/api"

print(f"🧪 Tests du backend Café Comptoir")
print(f"📍 URL de test: {API_BASE_URL}")
print("=" * 60)

class CafeComptorAPITester:
    def __init__(self):
        self.base_url = API_BASE_URL
        self.session = requests.Session()
        self.test_results = {
            'passed': 0,
            'failed': 0,
            'errors': []
        }
    
    def log_test(self, test_name, success, details=""):
        """Enregistrer le résultat d'un test"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   {details}")
        
        if success:
            self.test_results['passed'] += 1
        else:
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"{test_name}: {details}")
    
    def test_api_root(self):
        """Test de l'endpoint racine de l'API"""
        try:
            response = self.session.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                if data.get('restaurant') == 'Café Comptoir':
                    self.log_test("API Root", True, f"Status: {data.get('status')}")
                    return True
                else:
                    self.log_test("API Root", False, "Données restaurant incorrectes")
            else:
                self.log_test("API Root", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("API Root", False, f"Erreur: {str(e)}")
        return False
    
    def test_restaurant_info(self):
        """Test de l'API info restaurant"""
        try:
            response = self.session.get(f"{self.base_url}/info")
            if response.status_code == 200:
                data = response.json()
                if data.get('name') == 'Café Comptoir' and 'Montbrison' in data.get('address', ''):
                    self.log_test("Restaurant Info", True, f"Nom: {data.get('name')}")
                    return True
                else:
                    self.log_test("Restaurant Info", False, "Informations restaurant incorrectes")
            else:
                self.log_test("Restaurant Info", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Restaurant Info", False, f"Erreur: {str(e)}")
        return False
    
    def test_menu_api(self):
        """Test complet de l'API Menu"""
        print("\n📋 Tests API Menu:")
        
        # Test GET menu items
        try:
            response = self.session.get(f"{self.base_url}/menu/")
            if response.status_code == 200:
                menu_items = response.json()
                if len(menu_items) > 0:
                    self.log_test("Menu - Liste des plats", True, f"{len(menu_items)} plats trouvés")
                    
                    # Vérifier qu'on a des plats français traditionnels
                    has_french_dishes = any('canard' in item.get('name', '').lower() or 
                                          'rumsteck' in item.get('name', '').lower() 
                                          for item in menu_items)
                    if has_french_dishes:
                        self.log_test("Menu - Plats français", True, "Plats traditionnels présents")
                    else:
                        self.log_test("Menu - Plats français", False, "Pas de plats traditionnels trouvés")
                else:
                    self.log_test("Menu - Liste des plats", False, "Aucun plat trouvé")
            else:
                self.log_test("Menu - Liste des plats", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Menu - Liste des plats", False, f"Erreur: {str(e)}")
        
        # Test GET categories
        try:
            response = self.session.get(f"{self.base_url}/menu/categories")
            if response.status_code == 200:
                data = response.json()
                categories = data.get('categories', [])
                if len(categories) > 0:
                    self.log_test("Menu - Catégories", True, f"Catégories: {', '.join(categories)}")
                else:
                    self.log_test("Menu - Catégories", False, "Aucune catégorie trouvée")
            else:
                self.log_test("Menu - Catégories", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Menu - Catégories", False, f"Erreur: {str(e)}")
        
        # Test filtrage par catégorie
        try:
            response = self.session.get(f"{self.base_url}/menu/?category=Plats principaux")
            if response.status_code == 200:
                filtered_items = response.json()
                if len(filtered_items) > 0:
                    self.log_test("Menu - Filtre catégorie", True, f"{len(filtered_items)} plats principaux")
                else:
                    self.log_test("Menu - Filtre catégorie", False, "Aucun plat principal trouvé")
            else:
                self.log_test("Menu - Filtre catégorie", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Menu - Filtre catégorie", False, f"Erreur: {str(e)}")
    
    def test_reviews_api(self):
        """Test complet de l'API Avis Clients"""
        print("\n⭐ Tests API Avis Clients:")
        
        # Test GET reviews (approuvés seulement)
        try:
            response = self.session.get(f"{self.base_url}/reviews/")
            if response.status_code == 200:
                reviews = response.json()
                if len(reviews) > 0:
                    self.log_test("Avis - Liste approuvés", True, f"{len(reviews)} avis trouvés")
                    
                    # Vérifier que tous sont approuvés
                    all_approved = all(review.get('approved', False) for review in reviews)
                    if all_approved:
                        self.log_test("Avis - Filtre approbation", True, "Tous les avis sont approuvés")
                    else:
                        self.log_test("Avis - Filtre approbation", False, "Des avis non approuvés sont visibles")
                else:
                    self.log_test("Avis - Liste approuvés", False, "Aucun avis trouvé")
            else:
                self.log_test("Avis - Liste approuvés", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Avis - Liste approuvés", False, f"Erreur: {str(e)}")
        
        # Test POST nouveau avis
        try:
            new_review = {
                "name": "Marie Dubois",
                "rating": 5,
                "comment": "Excellent restaurant ! La cuisine est délicieuse et l'accueil chaleureux. Je recommande vivement le pavé de rumsteck.",
                "email": "marie.dubois@email.com"
            }
            
            response = self.session.post(f"{self.base_url}/reviews/", json=new_review)
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'avis a été publié' in data.get('message', ''):
                    self.log_test("Avis - Création", True, f"Avis créé: {data.get('data', {}).get('review_id')}")
                    return data.get('data', {}).get('review_id')
                else:
                    self.log_test("Avis - Création", False, "Réponse incorrecte")
            else:
                self.log_test("Avis - Création", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Avis - Création", False, f"Erreur: {str(e)}")
        
        # Test validation rating (doit être entre 1 et 5)
        try:
            invalid_review = {
                "name": "Test User",
                "rating": 6,  # Invalid rating
                "comment": "Test comment"
            }
            
            response = self.session.post(f"{self.base_url}/reviews/", json=invalid_review)
            if response.status_code == 422:  # Validation error expected
                self.log_test("Avis - Validation rating", True, "Validation rating 1-5 fonctionne")
            else:
                self.log_test("Avis - Validation rating", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Avis - Validation rating", False, f"Erreur: {str(e)}")
        
        return None
    
    def test_reservations_api(self):
        """Test complet de l'API Réservations"""
        print("\n📅 Tests API Réservations:")
        
        # Test POST nouvelle réservation
        try:
            # Date future pour la réservation
            future_date = (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")
            
            new_reservation = {
                "date": future_date,
                "time": "19:30",
                "guests": "4",
                "firstName": "Pierre",
                "lastName": "Martin",
                "phone": "06 12 34 56 78",
                "email": "pierre.martin@email.com",
                "message": "Table près de la fenêtre si possible"
            }
            
            response = self.session.post(f"{self.base_url}/reservations/", json=new_reservation)
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'confirmée' in data.get('message', ''):
                    reservation_id = data.get('data', {}).get('reservation_id')
                    self.log_test("Réservation - Création", True, f"ID: {reservation_id}")
                    return reservation_id
                else:
                    self.log_test("Réservation - Création", False, "Réponse incorrecte")
            else:
                self.log_test("Réservation - Création", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Réservation - Création", False, f"Erreur: {str(e)}")
        
        # Test validation date passée
        try:
            past_date = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
            
            invalid_reservation = {
                "date": past_date,
                "time": "19:30",
                "guests": "2",
                "firstName": "Test",
                "lastName": "User",
                "phone": "06 00 00 00 00",
                "email": "test@email.com"
            }
            
            response = self.session.post(f"{self.base_url}/reservations/", json=invalid_reservation)
            if response.status_code == 400:
                self.log_test("Réservation - Validation date", True, "Validation date passée fonctionne")
            else:
                self.log_test("Réservation - Validation date", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Réservation - Validation date", False, f"Erreur: {str(e)}")
        
        # Test validation email
        try:
            invalid_email_reservation = {
                "date": (datetime.now() + timedelta(days=5)).strftime("%Y-%m-%d"),
                "time": "20:00",
                "guests": "2",
                "firstName": "Test",
                "lastName": "User",
                "phone": "06 00 00 00 00",
                "email": "email-invalide"  # Email invalide
            }
            
            response = self.session.post(f"{self.base_url}/reservations/", json=invalid_email_reservation)
            if response.status_code == 422:  # Validation error expected
                self.log_test("Réservation - Validation email", True, "Validation email fonctionne")
            else:
                self.log_test("Réservation - Validation email", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Réservation - Validation email", False, f"Erreur: {str(e)}")
        
        # Test GET réservations
        try:
            response = self.session.get(f"{self.base_url}/reservations/")
            if response.status_code == 200:
                reservations = response.json()
                self.log_test("Réservation - Liste", True, f"{len(reservations)} réservations trouvées")
            else:
                self.log_test("Réservation - Liste", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Réservation - Liste", False, f"Erreur: {str(e)}")
        
        return None
    
    def test_contact_api(self):
        """Test complet de l'API Contact"""
        print("\n📧 Tests API Contact:")
        
        # Test POST nouveau message de contact
        try:
            new_contact = {
                "name": "Julie Rousseau",
                "email": "julie.rousseau@email.com",
                "subject": "Demande d'information",
                "message": "Bonjour, j'aimerais organiser un événement privé dans votre restaurant. Pouvez-vous me contacter pour discuter des modalités ?"
            }
            
            response = self.session.post(f"{self.base_url}/contact/", json=new_contact)
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'envoyé avec succès' in data.get('message', ''):
                    contact_id = data.get('data', {}).get('contact_id')
                    self.log_test("Contact - Envoi message", True, f"ID: {contact_id}")
                    return contact_id
                else:
                    self.log_test("Contact - Envoi message", False, "Réponse incorrecte")
            else:
                self.log_test("Contact - Envoi message", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Contact - Envoi message", False, f"Erreur: {str(e)}")
        
        # Test GET messages de contact (admin)
        try:
            response = self.session.get(f"{self.base_url}/contact/")
            if response.status_code == 200:
                contacts = response.json()
                self.log_test("Contact - Liste messages", True, f"{len(contacts)} messages trouvés")
            else:
                self.log_test("Contact - Liste messages", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Contact - Liste messages", False, f"Erreur: {str(e)}")
        
        # Test validation email
        try:
            invalid_contact = {
                "name": "Test User",
                "email": "email-invalide",  # Email invalide
                "subject": "Test",
                "message": "Test message"
            }
            
            response = self.session.post(f"{self.base_url}/contact/", json=invalid_contact)
            if response.status_code == 422:  # Validation error expected
                self.log_test("Contact - Validation email", True, "Validation email fonctionne")
            else:
                self.log_test("Contact - Validation email", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Contact - Validation email", False, f"Erreur: {str(e)}")
        
        return None
    
    def run_all_tests(self):
        """Exécuter tous les tests"""
        print("🚀 Démarrage des tests complets du backend Café Comptoir\n")
        
        # Tests de base
        print("🔧 Tests de base:")
        self.test_api_root()
        self.test_restaurant_info()
        
        # Tests des APIs principales
        self.test_menu_api()
        self.test_reviews_api()
        self.test_reservations_api()
        self.test_contact_api()
        
        # Résumé des résultats
        print("\n" + "=" * 60)
        print("📊 RÉSUMÉ DES TESTS")
        print("=" * 60)
        print(f"✅ Tests réussis: {self.test_results['passed']}")
        print(f"❌ Tests échoués: {self.test_results['failed']}")
        
        if self.test_results['errors']:
            print("\n🚨 ERREURS DÉTECTÉES:")
            for error in self.test_results['errors']:
                print(f"   • {error}")
        
        success_rate = (self.test_results['passed'] / (self.test_results['passed'] + self.test_results['failed'])) * 100
        print(f"\n📈 Taux de réussite: {success_rate:.1f}%")
        
        if success_rate >= 90:
            print("🎉 EXCELLENT! Le backend fonctionne parfaitement.")
        elif success_rate >= 75:
            print("👍 BON! Quelques améliorations mineures possibles.")
        else:
            print("⚠️  ATTENTION! Des problèmes critiques nécessitent une correction.")
        
        return success_rate >= 75

if __name__ == "__main__":
    tester = CafeComptorAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎯 CONCLUSION: Backend opérationnel pour le restaurant Café Comptoir!")
    else:
        print("\n🔧 CONCLUSION: Des corrections sont nécessaires avant mise en production.")