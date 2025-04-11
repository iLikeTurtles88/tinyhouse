"use client";

import React from 'react';
import PropertyCard from '@/components/property-card';

interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrls: string[];
  videoUrl: string;
  price: number;
  amenities: string[];
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  ownerContact: string;
  bookingEmail: string;
}

const dummyProperties: Property[] = [
  {
    id: '1',
    name: 'Cabane Montagnarde Isolée',
    description: "Évadez-vous dans cette cabane confortable nichée au cœur des montagnes. Profitez de vues à couper le souffle et d'un environnement paisible.",
    location: 'Ardennes, Belgique',
    imageUrls: [
      '/images/cabane_montagnarde_1.jpg',
      '/images/cabane_montagnarde_2.jpg',
      '/images/cabane_montagnarde_3.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 175,
    amenities: ['WiFi', 'Cuisine', 'Cheminée', 'Jacuzzi'],
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    ownerContact: "Sophie Dubois",
    bookingEmail: "sophie.dubois@example.com"
  },
  {
    id: '2',
    name: 'Maison de Plage Vue Océan',
    description: "Détendez-vous dans cette superbe maison de plage avec vue panoramique sur l'océan. Parfait pour une escapade en famille ou une escapade romantique.",
    location: 'Knokke, Belgique',
    imageUrls: [
      '/images/maison_plage_1.jpg',
      '/images/maison_plage_2.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 250,
    amenities: ['WiFi', 'Accès à la plage', 'Balcon', 'Animaux acceptés'],
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    ownerContact: "Jean-Luc Picard",
    bookingEmail: "jean-luc.picard@example.com"
  },
  {
    id: '3',
    name: 'Charmant Cottage au Bord du Lac',
    description: "Découvrez la tranquillité de la vie au bord du lac dans ce charmant cottage. Profitez de la baignade, de la pêche et de la navigation de plaisance directement depuis votre porte.",
    location: 'Gand, Belgique',
    imageUrls: [
      '/images/cottage_lac_1.jpg',
      '/images/cottage_lac_2.jpg',
      '/images/cottage_lac_3.jpg',
      '/images/cottage_lac_4.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 200,
    amenities: ['WiFi', 'Cuisine', 'Quai', 'Kayaks'],
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    ownerContact: "Marie Dupont",
    bookingEmail: "marie.dupont@example.com"
  },
  {
    id: '4',
    name: 'Retraite Rustique dans le Désert',
    description: "Découvrez la beauté du désert dans cette retraite rustique. Profitez de l'observation des étoiles, de la randonnée et de l'exploration du paysage unique.",
    location: 'Bruges, Belgique',
    imageUrls: [
      '/images/desert_retreat_1.jpg',
      '/images/desert_retreat_2.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 150,
    amenities: ['WiFi', 'Cuisine', 'Foyer', 'Sentiers de randonnée'],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    ownerContact: "Pierre Dubois",
    bookingEmail: "pierre.dubois@example.com"
  },
  {
    id: '5',
    name: 'Appartement Chic et Urbain',
    description: "Découvrez la vie citadine dans cet appartement élégant et moderne. Profitez d'un accès facile aux restaurants, aux boutiques et aux attractions.",
    location: 'Anvers, Belgique',
    imageUrls: [
      '/images/urban_apartment_1.jpg',
      '/images/urban_apartment_2.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 300,
    amenities: ['WiFi', 'Gym', 'Concierge', 'Vues sur la ville'],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    ownerContact: "Isabelle Lefevre",
    bookingEmail: "isabelle.lefevre@example.com"
  },
  {
    id: '6',
    name: 'Bungalow Tropical sur l\'Île',
    description: "Évadez-vous au paradis dans ce charmant bungalow insulaire. Profitez de plages de sable blanc, d'eaux cristallines et d'une végétation tropicale luxuriante.",
    location: 'Liège, Belgique',
    imageUrls: [
      '/images/tropical_bungalow_1.jpg',
      '/images/tropical_bungalow_2.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 275,
    amenities: ['WiFi', 'Accès à la plage', 'Snorkeling', 'Hamac'],
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    ownerContact: "Thomas Bernard",
    bookingEmail: "thomas.bernard@example.com"
  },
];

const PropertyList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyProperties.map((property) => (
        <PropertyCard key={property.id} property={property}/>
      ))}
    </div>
  );
};

export default PropertyList;
