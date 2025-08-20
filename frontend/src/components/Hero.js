import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { restaurantInfo } from '../mockData';

const Hero = () => {
  const scrollToReservation = () => {
    const element = document.getElementById('reservation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToInfos = () => {
    const element = document.getElementById('infos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="hero-section">
      <div className="container">
        <div className="grid-2 items-center">
          {/* Contenu textuel */}
          <div className="hero-content">
            <div className="hero-subtitle fade-in-up">
              Restaurant traditionnel français
            </div>
            
            <h1 className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              {restaurantInfo.name}
            </h1>
            
            <p className="text-xl mb-4 fade-in-up" style={{ 
              animationDelay: '0.4s',
              color: 'var(--color-text-light)',
              fontWeight: '500'
            }}>
              {restaurantInfo.slogan}
            </p>
            
            <p className="mb-8 fade-in-up" style={{ 
              animationDelay: '0.6s',
              fontSize: '1.2rem',
              lineHeight: '1.8'
            }}>
              Découvrez une cuisine française authentique préparée avec passion 
              dans notre restaurant chaleureux au cœur de Montbrison. 
              Produits frais et locaux, ambiance conviviale garantie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 fade-in-up" style={{ animationDelay: '0.8s' }}>
              <button
                onClick={scrollToReservation}
                className="btn-primary flex-1 sm:flex-initial"
              >
                <Calendar size={20} />
                Réservez votre table
              </button>
              
              <button
                onClick={scrollToInfos}
                className="btn-secondary flex-1 sm:flex-initial"
              >
                <MapPin size={20} />
                Nous localiser
              </button>
            </div>

            {/* Informations rapides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 fade-in-up" style={{ animationDelay: '1s' }}>
              <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold mb-2" style={{ color: 'var(--color-secondary)' }}>
                  Nos horaires
                </h4>
                <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                  Lun, Mar, Jeu : midi<br />
                  Ven, Sam : midi & soir
                </p>
              </div>
              
              <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold mb-2" style={{ color: 'var(--color-secondary)' }}>
                  Réservations
                </h4>
                <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                  {restaurantInfo.phone}<br />
                  <span className="text-xs">Réservation recommandée</span>
                </p>
              </div>
            </div>
          </div>

          {/* Image principale */}
          <div className="order-first lg:order-last">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                alt="Restaurant Café Comptoir - Intérieur chaleureux"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                style={{
                  filter: 'sepia(10%) saturate(1.1) brightness(1.05)',
                  animationDelay: '0.4s'
                }}
              />
              
              {/* Badge flottant */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl fade-in-up" 
                   style={{ animationDelay: '1.2s' }}>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                    ★ 4.8
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                    Avis clients
                  </div>
                </div>
              </div>
              
              {/* Badge spécialités */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-xl p-4 shadow-xl fade-in-up" 
                   style={{ animationDelay: '1s' }}>
                <div className="text-center">
                  <div className="font-bold text-sm">
                    Cuisine
                  </div>
                  <div className="text-xs opacity-90">
                    Traditionnelle
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;