import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { restaurantInfo } from '../mockData';
import { reservationAPI, handleAPIError } from '../services/api';

const Reservation = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Options de créneaux horaires
  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00',
    '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '8+'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Supprimer l'erreur si le champ est corrigé
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) newErrors.date = 'Veuillez sélectionner une date';
    if (!formData.time) newErrors.time = 'Veuillez choisir un horaire';
    if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
    if (!formData.phone) newErrors.phone = 'Le téléphone est requis';
    if (!formData.email) newErrors.email = 'L\'email est requis';

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    // Validation date (pas dans le passé)
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Veuillez choisir une date future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulation de l'envoi
      console.log('Données de réservation:', formData);
      setIsSubmitted(true);
      
      // Reset après 5 secondes
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          date: '',
          time: '',
          guests: '2',
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          message: ''
        });
      }, 5000);
    }
  };

  // Date minimum (aujourd'hui)
  const today = new Date().toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <section id="reservation" className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12">
              <CheckCircle className="mx-auto mb-6 text-green-600" size={64} />
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>
                Réservation Confirmée !
              </h2>
              <p className="text-lg mb-6" style={{ color: 'var(--color-text-light)' }}>
                Merci {formData.firstName} ! Votre demande de réservation pour {formData.guests} personne(s) 
                le {new Date(formData.date).toLocaleDateString('fr-FR')} à {formData.time} a été envoyée.
              </p>
              <p className="mb-8" style={{ color: 'var(--color-text-light)' }}>
                Nous vous confirmerons votre réservation par téléphone dans les plus brefs délais.
              </p>
              
              <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-3" style={{ color: 'var(--color-secondary)' }}>
                  Récapitulatif de votre réservation
                </h3>
                <div className="text-left space-y-2" style={{ color: 'var(--color-text-light)' }}>
                  <p><strong>Date :</strong> {new Date(formData.date).toLocaleDateString('fr-FR', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}</p>
                  <p><strong>Heure :</strong> {formData.time}</p>
                  <p><strong>Nombre de convives :</strong> {formData.guests}</p>
                  <p><strong>Contact :</strong> {formData.phone}</p>
                </div>
              </div>
              
              <div className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                Pour toute modification ou annulation, contactez-nous au {restaurantInfo.phone}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservation" className="section bg-cream">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="fade-in-up">Réservation</h2>
          <p className="text-xl mt-4 fade-in-up" style={{ 
            color: 'var(--color-text-light)',
            animationDelay: '0.2s'
          }}>
            Réservez votre table en quelques clics pour une expérience gastronomique inoubliable
          </p>
          <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire de réservation */}
            <div className="card fade-in-up">
              <h3 className="text-2xl font-semibold mb-8 text-center" style={{ color: 'var(--color-secondary)' }}>
                Réserver votre table
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date et heure */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-2" style={{ color: 'var(--color-text-dark)' }}>
                      <Calendar size={20} className="inline mr-2" />
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={today}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                        errors.date ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block font-medium mb-2" style={{ color: 'var(--color-text-dark)' }}>
                      <Clock size={20} className="inline mr-2" />
                      Heure
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                        errors.time ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Choisir un créneau</option>
                      <optgroup label="Service du midi">
                        {timeSlots.filter(time => time.startsWith('1')).map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Service du soir">
                        {timeSlots.filter(time => time.startsWith('1') === false).map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                  </div>
                </div>

                {/* Nombre de convives */}
                <div>
                  <label className="block font-medium mb-2" style={{ color: 'var(--color-text-dark)' }}>
                    <Users size={20} className="inline mr-2" />
                    Nombre de convives
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    {guestOptions.map(option => (
                      <option key={option} value={option}>
                        {option === '8+' ? '8 personnes ou plus' : `${option} personne${option > '1' ? 's' : ''}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Informations personnelles */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-2" style={{ color: 'var(--color-text-dark)' }}>
                      <User size={20} className="inline mr-2" />
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Votre prénom"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block font-medium mb-2" style={{ color: 'var(--color-text-dark)' }}>
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Contact */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-2" style={{ color: 'var(--color-text-dark)' }}>
                      <Phone size={20} className="inline mr-2" />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="06 12 34 56 78"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block font-medium mb-2" style={{ color: 'var(--color-text-dark)' }}>
                      <Mail size={20} className="inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Message optionnel */}
                <div>
                  <label className="block font-medium mb-2" style={{ color: 'var(--color-text-dark)' }}>
                    Message (optionnel)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                    placeholder="Allergies alimentaires, occasion spéciale, demandes particulières..."
                  ></textarea>
                </div>

                {/* Bouton de soumission */}
                <button
                  type="submit"
                  className="btn-primary w-full text-lg py-4"
                >
                  Confirmer ma réservation
                </button>

                <p className="text-sm text-center" style={{ color: 'var(--color-text-light)' }}>
                  * Champs obligatoires. Vous recevrez une confirmation par téléphone.
                </p>
              </form>
            </div>

            {/* Informations complémentaires */}
            <div className="space-y-8 fade-in-up" style={{ animationDelay: '0.3s' }}>
              {/* Contact direct */}
              <div className="card">
                <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-secondary)' }}>
                  Réservation par téléphone
                </h3>
                
                <p className="mb-6" style={{ color: 'var(--color-text-light)' }}>
                  Vous préférez réserver par téléphone ? Notre équipe se fera un plaisir de vous accueillir.
                </p>
                
                <div className="text-center">
                  <a 
                    href={`tel:${restaurantInfo.phone}`}
                    className="btn-primary inline-flex items-center gap-3 text-2xl py-4 px-8"
                  >
                    <Phone size={24} />
                    {restaurantInfo.phone}
                  </a>
                  
                  <p className="mt-4 text-sm" style={{ color: 'var(--color-text-light)' }}>
                    Disponible aux heures d'ouverture du restaurant
                  </p>
                </div>
              </div>

              {/* Conseils de réservation */}
              <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
                <h4 className="font-semibold mb-4" style={{ color: 'var(--color-secondary)' }}>
                  Conseils de réservation
                </h4>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 bg-yellow-500 flex-shrink-0"></div>
                    <span style={{ color: 'var(--color-text-light)' }}>
                      Réservation recommandée, surtout pour les weekends
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 bg-yellow-500 flex-shrink-0"></div>
                    <span style={{ color: 'var(--color-text-light)' }}>
                      Pour les groupes de plus de 8 personnes, contactez-nous directement
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 bg-yellow-500 flex-shrink-0"></div>
                    <span style={{ color: 'var(--color-text-light)' }}>
                      Merci de nous prévenir en cas d'allergies alimentaires
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 bg-yellow-500 flex-shrink-0"></div>
                    <span style={{ color: 'var(--color-text-light)' }}>
                      Annulation possible jusqu'à 2h avant l'heure de réservation
                    </span>
                  </li>
                </ul>
              </div>

              {/* Horaires d'ouverture rappel */}
              <div className="card">
                <h4 className="font-semibold mb-4" style={{ color: 'var(--color-secondary)' }}>
                  Rappel des horaires
                </h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lundi, Mardi, Jeudi</span>
                    <span className="font-medium text-green-600">12h00 - 14h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendredi, Samedi</span>
                    <span className="font-medium text-green-600">12h00 - 14h00 • 19h00 - 22h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mercredi, Dimanche</span>
                    <span className="font-medium text-red-500">Fermé</span>
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

export default Reservation;