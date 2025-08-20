import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { galleryImages } from '../mockData';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <section id="galerie" className="section bg-cream">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="fade-in-up">Galerie</h2>
          <p className="text-xl mt-4 fade-in-up" style={{ 
            color: 'var(--color-text-light)',
            animationDelay: '0.2s'
          }}>
            Découvrez l'ambiance chaleureuse de notre restaurant et nos délicieux plats
          </p>
          <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
        </div>

        {/* Grille de la galerie */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(image, index)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="text-white" size={32} />
                </div>
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium text-sm">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section spéciale plats signatures */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12" style={{ color: 'var(--color-secondary)' }}>
            Nos Plats Signatures
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&h=100&fit=crop&crop=center"
                  alt="Pavé de rumsteck"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg" style={{ color: 'var(--color-secondary)' }}>
                    Pavé de Rumsteck
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--color-accent)' }}>
                    Notre spécialité grillée
                  </p>
                </div>
              </div>
              <p style={{ color: 'var(--color-text-light)' }}>
                Pièce de bœuf sélectionnée, grillée à la plancha et servie avec nos 
                pommes de terre rôties maison et légumes frais du marché.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop&crop=center"
                  alt="Cuisse de canard"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg" style={{ color: 'var(--color-secondary)' }}>
                    Cuisse de Canard Confite
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--color-accent)' }}>
                    Tradition française authentique
                  </p>
                </div>
              </div>
              <p style={{ color: 'var(--color-text-light)' }}>
                Confite selon la méthode traditionnelle, accompagnée de notre gratin 
                de crozets aux chanterelles, un délice de notre terroir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour l'image sélectionnée */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors duration-200"
            >
              <X className="text-white" size={24} />
            </button>

            {/* Boutons navigation */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-colors duration-200"
            >
              <ChevronLeft className="text-white" size={24} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-colors duration-200"
            >
              <ChevronRight className="text-white" size={24} />
            </button>

            {/* Image */}
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-6 rounded-b-lg">
              <h4 className="font-semibold text-lg mb-2">{selectedImage.caption}</h4>
              <p className="text-sm opacity-90">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;