// Mock data for Café Comptoir Montbrison
export const restaurantInfo = {
  name: "Café Comptoir",
  slogan: "Le rendez-vous des bons vivants à Montbrison",
  address: "14 Boulevard de la Madeleine, 42600 Montbrison, France",
  phone: "+33 4 77 58 46 77",
  email: "cafecomptoirmontbrison@gmail.com",
  socialMedia: {
    instagram: "@cafecomptoirmontbrison",
    facebook: "Café Comptoir Montbrison"
  },
  openingHours: {
    monday: "12h00 - 14h00",
    tuesday: "12h00 - 14h00", 
    wednesday: "Fermé",
    thursday: "12h00 - 14h00",
    friday: "12h00 - 14h00 • 19h00 - 22h00",
    saturday: "12h00 - 14h00 • 19h00 - 22h00",
    sunday: "Fermé"
  },
  closureInfo: "Fermeture annuelle : du 17 août au 31 août 2025"
};

export const menuItems = [
  {
    id: 1,
    name: "Pavé de rumsteck grillé à la plancha",
    description: "avec pommes de terre rôties et légumes frais de saison",
    price: "22€",
    category: "Plats principaux"
  },
  {
    id: 2,
    name: "Cuisse de canard confite",
    description: "gratin de crozets aux chanterelles et légumes du marché",
    price: "24€",
    category: "Plats principaux"
  },
  {
    id: 3,
    name: "Filet de féra du lac Léman",
    description: "sauce citronnée, légumes croquants et pommes vapeur",
    price: "26€",
    category: "Poissons"
  },
  {
    id: 4,
    name: "Feuillet fondant au reblochon et morilles",
    description: "salade verte et pommes de terre sautées à l'ail",
    price: "19€",
    category: "Spécialités"
  },
  {
    id: 5,
    name: "Menu Enfant",
    description: "Tagliatelles, nuggets de poulet fermier, glace surprise",
    price: "12€",
    category: "Enfants"
  }
];

export const reviews = [
  {
    id: 1,
    name: "Sophie L.",
    rating: 5,
    comment: "Un vrai régal, plats copieux et ambiance conviviale ! L'équipe est aux petits soins.",
    date: "Il y a 2 semaines"
  },
  {
    id: 2,
    name: "Marc D.", 
    rating: 5,
    comment: "Le meilleur restaurant français de Montbrison, je recommande vivement. Les produits sont frais et locaux.",
    date: "Il y a 1 mois"
  },
  {
    id: 3,
    name: "Isabelle R.",
    rating: 4,
    comment: "Excellente cuisine traditionnelle, service chaleureux. Parfait pour un déjeuner en famille.",
    date: "Il y a 3 semaines"
  },
  {
    id: 4,
    name: "Jean-Pierre M.",
    rating: 5,
    comment: "Une adresse incontournable ! La cuisse de canard confite est un délice.",
    date: "Il y a 1 semaine"
  }
];

export const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    alt: "Intérieur chaleureux du restaurant",
    caption: "Notre salle principale"
  },
  {
    id: 2, 
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
    alt: "Plat signature du restaurant",
    caption: "Pavé de rumsteck grillé"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", 
    alt: "Ambiance conviviale",
    caption: "Moments de partage"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    alt: "Cuisine traditionnelle française",
    caption: "Nos spécialités maison"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    alt: "Terrasse du restaurant",
    caption: "Notre terrasse d'été"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
    alt: "Équipe du restaurant",
    caption: "Notre équipe passionnée"
  }
];

export const aboutText = {
  title: "Notre histoire et philosophie",
  content: `Situé au cœur de Montbrison, le Café Comptoir vous accueille dans une atmosphère chaleureuse et authentique depuis de nombreuses années. Notre restaurant familial s'engage à vous proposer une cuisine française traditionnelle, préparée avec passion à partir de produits frais et locaux.

Notre chef et son équipe mettent un point d'honneur à sélectionner les meilleurs produits de nos producteurs locaux pour vous offrir des plats savoureux qui célèbrent les saveurs de notre terroir. De l'apéritif au dessert, chaque moment passé chez nous est pensé pour créer des souvenirs gourmands.

L'ambiance conviviale de notre établissement en fait le lieu idéal pour vos déjeuners d'affaires, repas en famille ou dîners entre amis. Notre équipe vous accueille avec le sourire et met tout en œuvre pour que votre expérience soit mémorable.`
};