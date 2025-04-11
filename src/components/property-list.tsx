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
  reviews: string[];
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
      'https://a0.muscache.com/im/pictures/miso/Hosting-57300906/original/649b7791-5f7a-49a8-b9f7-8b05c88ff176.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-57300906/original/d5a184c2-f141-47ca-98c4-21158d9210ba.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-57300906/original/5297ff06-5cf9-4f9f-b22b-7968649e82ba.jpeg?im_w=720',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 175,
    amenities: ['WiFi', 'Cuisine', 'Cheminée', 'Jacuzzi'],
    reviews: ['Emplacement incroyable', 'Très propre et bien entretenu'],
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
      'https://i.pinimg.com/564x/77/96/48/779648699c005e683122493a564889aa.jpg',
      'https://i.pinimg.com/564x/68/b5/86/68b58689aa54a642f8a1fa522486f7b8.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 250,
    amenities: ['WiFi', 'Accès à la plage', 'Balcon', 'Animaux acceptés'],
    reviews: ['Vue incroyable', 'Parfait pour les familles', 'Excellent rapport qualité-prix'],
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
      'https://i.pinimg.com/564x/b8/70/27/b87027b8f8aa1d79389368e78512fa87.jpg',
      'https://i.pinimg.com/564x/75/1f/d0/751fd05c483786d8f9024871ea5a0814.jpg',
      'https://i.pinimg.com/564x/6e/9c/4c/6e9c4c3d1ca9b9826240c6c889182cf1.jpg',
      'https://i.pinimg.com/564x/5a/9d/89/5a9d894701102e645e09870b7978302d.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 200,
    amenities: ['WiFi', 'Cuisine', 'Quai', 'Kayaks'],
    reviews: ['Beau lac', 'Calme et reposant', 'Bien équipé'],
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
      'https://i.pinimg.com/564x/4a/58/cc/4a58cc3fa0af844275f72a39c4cf573f.jpg',
      'https://i.pinimg.com/564x/64/08/87/640887c20ad57d842b29c4b3ca414d51.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 150,
    amenities: ['WiFi', 'Cuisine', 'Foyer', 'Sentiers de randonnée'],
    reviews: ["Observation des étoiles incroyable", 'Paisible et isolée', 'Super randonnée'],
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
      'https://i.pinimg.com/564x/d8/49/4a/d8494ad904406958490df115c6e9e72d.jpg',
      'https://i.pinimg.com/564x/b7/4a/d9/b74ad9b3fa23617348238c4b04433ff3.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 300,
    amenities: ['WiFi', 'Gym', 'Concierge', 'Vues sur la ville'],
    reviews: ['Super emplacement', 'Élégant et moderne', 'Excellentes commodités'],
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
      'https://i.pinimg.com/564x/f9/41/1e/f9411ee5c8ca1261860c726641a53072.jpg',
      'https://i.pinimg.com/564x/9d/1a/5c/9d1a5c6552bc60fabb69a52e9a05952f.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 275,
    amenities: ['WiFi', 'Accès à la plage', 'Snorkeling', 'Hamac'],
    reviews: ['Paradis trouvé', 'Snorkeling incroyable', 'Ambiance relaxante'],
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
