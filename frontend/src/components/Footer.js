import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Heart, ChefHat } from 'lucide-react';
import { restaurantInfo } from '../mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary text-white">
      {/* Section principale */}
      <div className="container py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Informations du restaurant */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
                <ChefHat size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
                  {restaurantInfo.name}
                </h3>
                <p className="text-yellow-200 text-sm">Restaurant traditionnel français</p>
              </div>
            </div>
            
            <p className="text-gray-200 mb-6 text-lg leading-relaxed">
              {restaurantInfo.slogan}
            </p>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              Situé au cœur de Montbrison, notre restaurant vous propose une cuisine française 
              authentique dans une ambiance chaleureuse et conviviale. Produits frais, savoir-faire 
              artisanal et accueil personnalisé pour des moments gourmands inoubliables.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/cafecomptoirmontbrison"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 hover:transform hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/cafecomptoirmontbrison"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 hover:transform hover:scale-110"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-yellow-200">Navigation</h4>
            <ul className="space-y-3">
              {[
                { id: 'accueil', label: 'Accueil' },
                { id: 'a-propos', label: 'À propos' },
                { id: 'menu', label: 'Notre Menu' },
                { id: 'galerie', label: 'Galerie' },
                { id: 'infos', label: 'Infos pratiques' },
                { id: 'avis', label: 'Avis clients' },
                { id: 'reservation', label: 'Réservation' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-300 hover:text-yellow-200 transition-colors duration-200 text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact et horaires */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-yellow-200">Contact & Horaires</h4>
            
            {/* Informations de contact */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="flex-shrink-0 mt-1 text-yellow-200" size={18} />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {restaurantInfo.address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="flex-shrink-0 text-yellow-200" size={18} />
                <a 
                  href={`tel:${restaurantInfo.phone}`}
                  className="text-gray-300 hover:text-yellow-200 transition-colors duration-200 text-sm"
                >
                  {restaurantInfo.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="flex-shrink-0 text-yellow-200" size={18} />
                <a 
                  href={`mailto:${restaurantInfo.email}`}
                  className="text-gray-300 hover:text-yellow-200 transition-colors duration-200 text-sm"
                >
                  {restaurantInfo.email}
                </a>
              </div>
            </div>

            {/* Horaires résumés */}
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="text-yellow-200" size={18} />
                <h5 className="font-medium text-yellow-200">Horaires</h5>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Lun, Mar, Jeu</span>
                  <span className="text-white font-medium">12h-14h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Ven, Sam</span>
                  <span className="text-white font-medium">12h-14h • 19h-22h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Mer, Dim</span>
                  <span className="text-red-300">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de séparation */}
      <div className="border-t border-white border-opacity-20">
        <div className="container py-8">
          {/* CTA final */}
          <div className="text-center mb-8">
            <h4 className="text-xl font-semibold mb-4 text-yellow-200">
              Prêt à vivre une expérience gastronomique unique ?
            </h4>
            <button
              onClick={() => scrollToSection('reservation')}
              className="btn-primary bg-yellow-600 hover:bg-yellow-700 text-white border-none"
            >
              <Calendar size={20} />
              Réservez maintenant
            </button>
          </div>

          {/* Copyright et mentions */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <span>© {currentYear} {restaurantInfo.name}</span>
              <span>•</span>
              <span>Tous droits réservés</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Fait avec <Heart size={14} className="text-red-400" fill="currentColor" /> à Montbrison
              </span>
            </div>
            
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-yellow-200 transition-colors duration-200">
                Mentions légales
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-200 transition-colors duration-200">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;