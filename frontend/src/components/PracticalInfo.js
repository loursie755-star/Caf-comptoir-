import React from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Car, Utensils } from 'lucide-react';
import { restaurantInfo } from '../mockData';

const PracticalInfo = () => {
  const openingHoursArray = [
    { day: 'Lundi', hours: restaurantInfo.openingHours.monday },
    { day: 'Mardi', hours: restaurantInfo.openingHours.tuesday },
    { day: 'Mercredi', hours: restaurantInfo.openingHours.wednesday },
    { day: 'Jeudi', hours: restaurantInfo.openingHours.thursday },
    { day: 'Vendredi', hours: restaurantInfo.openingHours.friday },
    { day: 'Samedi', hours: restaurantInfo.openingHours.saturday },
    { day: 'Dimanche', hours: restaurantInfo.openingHours.sunday }
  ];

  const isOpen = (dayHours) => dayHours !== 'Fermé';

  return (
    <section id="infos" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="fade-in-up">Informations Pratiques</h2>
          <p className="text-xl mt-4 fade-in-up" style={{ 
            color: 'var(--color-text-light)',
            animationDelay: '0.2s'
          }}>
            Tout ce que vous devez savoir pour nous rendre visite
          </p>
          <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact et horaires */}
          <div className="space-y-8">
            {/* Contact */}
            <div className="card fade-in-up">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3" 
                  style={{ color: 'var(--color-secondary)' }}>
                <Phone size={24} />
                Contact
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="flex-shrink-0 mt-1" size={20} style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text-dark)' }}>Adresse</p>
                    <p style={{ color: 'var(--color-text-light)' }}>{restaurantInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Phone className="flex-shrink-0" size={20} style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text-dark)' }}>Téléphone</p>
                    <a 
                      href={`tel:${restaurantInfo.phone}`}
                      className="hover:underline"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      {restaurantInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Mail className="flex-shrink-0" size={20} style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text-dark)' }}>Email</p>
                    <a 
                      href={`mailto:${restaurantInfo.email}`}
                      className="hover:underline"
                      style={{ color: 'var(--color-text-light)' }}
                    >
                      {restaurantInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Horaires d'ouverture */}
            <div className="card fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3" 
                  style={{ color: 'var(--color-secondary)' }}>
                <Clock size={24} />
                Horaires d'ouverture
              </h3>
              
              <div className="space-y-3">
                {openingHoursArray.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                      isOpen(item.hours) ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    <span className="font-medium" style={{ color: 'var(--color-text-dark)' }}>
                      {item.day}
                    </span>
                    <span 
                      className={`font-semibold ${
                        isOpen(item.hours) ? 'text-green-700' : 'text-gray-500'
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Calendar className="flex-shrink-0 mt-0.5" size={20} style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <p className="font-medium mb-1" style={{ color: 'var(--color-text-dark)' }}>
                      Fermeture annuelle
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                      {restaurantInfo.closureInfo}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations pratiques */}
            <div className="card fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3" 
                  style={{ color: 'var(--color-secondary)' }}>
                <Utensils size={24} />
                Informations utiles
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Car className="flex-shrink-0 mt-1" size={20} style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text-dark)' }}>Stationnement</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                      Places de parking disponibles à proximité du restaurant
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Calendar className="flex-shrink-0 mt-1" size={20} style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text-dark)' }}>Réservations</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                      Réservation fortement recommandée, surtout le weekend
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Utensils className="flex-shrink-0 mt-1" size={20} style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text-dark)' }}>Service</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                      Équipe attentionnée, conseils personnalisés pour vos choix
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carte Google Maps */}
          <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="card">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3" 
                  style={{ color: 'var(--color-secondary)' }}>
                <MapPin size={24} />
                Notre localisation
              </h3>
              
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.123456789!2d4.067531!3d45.617894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f5aa5e8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2s14%20Boulevard%20de%20la%20Madeleine%2C%2042600%20Montbrison%2C%20France!5e0!3m2!1sen!2sfr!4v1629123456789!5m2!1sen!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Café Comptoir"
                ></iframe>
              </div>
              
              <div className="mt-6 text-center">
                <a
                  href="https://www.google.com/maps/dir//14+Boulevard+de+la+Madeleine,+42600+Montbrison,+France"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MapPin size={20} />
                  Obtenir l'itinéraire
                </a>
              </div>
            </div>

            {/* Informations transport */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-6">
              <h4 className="font-semibold mb-4" style={{ color: 'var(--color-secondary)' }}>
                Comment nous rejoindre ?
              </h4>
              
              <div className="space-y-3 text-sm">
                <p style={{ color: 'var(--color-text-light)' }}>
                  <strong>En voiture :</strong> Centre-ville de Montbrison, parking à proximité
                </p>
                <p style={{ color: 'var(--color-text-light)' }}>
                  <strong>Transports en commun :</strong> Arrêt de bus "Madeleine" à 2 minutes à pied
                </p>
                <p style={{ color: 'var(--color-text-light)' }}>
                  <strong>À pied :</strong> Centre historique de Montbrison, proche de tous commerces
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticalInfo;