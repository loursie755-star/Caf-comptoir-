import React, { useState } from 'react';
import { Star, Quote, ThumbsUp, MessageCircle } from 'lucide-react';
import { reviews } from '../mockData';

const Reviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={20}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <section id="avis" className="section bg-cream">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="fade-in-up">Avis de nos Clients</h2>
          <p className="text-xl mt-4 fade-in-up" style={{ 
            color: 'var(--color-text-light)',
            animationDelay: '0.2s'
          }}>
            Découvrez ce que nos clients pensent de leur expérience chez nous
          </p>
          <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
        </div>

        {/* Statistiques globales */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16 fade-in-up">
          <div className="text-center">
            <div className="mb-4">
              <div className="text-6xl font-bold" style={{ color: 'var(--color-accent)' }}>
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center gap-1 mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-lg" style={{ color: 'var(--color-text-light)' }}>
                Basé sur {totalReviews} avis clients
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-secondary)' }}>
                  95%
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                  Clients satisfaits
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-secondary)' }}>
                  4.8
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                  Note moyenne
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-secondary)' }}>
                  92%
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                  Recommandations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carrousel des avis */}
        <div className="relative mb-16">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl fade-in-up">
            <div className="text-center">
              <Quote className="mx-auto mb-6" size={48} style={{ color: 'var(--color-accent)' }} />
              
              <blockquote className="text-xl lg:text-2xl font-medium mb-8 leading-relaxed" 
                          style={{ color: 'var(--color-text-dark)' }}>
                "{reviews[currentReview].comment}"
              </blockquote>
              
              <div className="flex justify-center gap-1 mb-4">
                {renderStars(reviews[currentReview].rating)}
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <div>
                  <h4 className="font-semibold text-lg" style={{ color: 'var(--color-secondary)' }}>
                    {reviews[currentReview].name}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                    {reviews[currentReview].date}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation du carrousel */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="btn-secondary flex items-center gap-2"
            >
              ← Précédent
            </button>
            
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentReview 
                      ? 'w-8' 
                      : 'opacity-50'
                  }`}
                  style={{ 
                    backgroundColor: index === currentReview 
                      ? 'var(--color-accent)' 
                      : 'var(--color-text-light)' 
                  }}
                />
              ))}
            </div>
            
            <button
              onClick={nextReview}
              className="btn-secondary flex items-center gap-2"
            >
              Suivant →
            </button>
          </div>
        </div>

        {/* Grille des avis */}
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={review.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                  {review.date}
                </span>
              </div>
              
              <p className="mb-4 leading-relaxed" style={{ color: 'var(--color-text-light)' }}>
                {review.comment}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="font-semibold" style={{ color: 'var(--color-secondary)' }}>
                  {review.name}
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <ThumbsUp size={16} style={{ color: 'var(--color-text-light)' }} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <MessageCircle size={16} style={{ color: 'var(--color-text-light)' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action pour laisser un avis */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 border-2 border-yellow-200">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-secondary)' }}>
              Partagez votre expérience !
            </h3>
            
            <p className="mb-6 text-lg" style={{ color: 'var(--color-text-light)' }}>
              Votre avis nous aide à nous améliorer et aide d'autres clients à découvrir notre restaurant.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.google.com/maps/place/14+Boulevard+de+la+Madeleine,+42600+Montbrison"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Laisser un avis Google
              </a>
              
              <a
                href="https://www.tripadvisor.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Avis TripAdvisor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;