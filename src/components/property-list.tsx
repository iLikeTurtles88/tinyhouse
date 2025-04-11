"use client"

import React from 'react';
import PropertyCard from '@/components/property-card';

const dummyProperties = [
  {
    id: '1',
    name: 'Cabane Montagnarde Isolée',
    description: "Évadez-vous dans cette cabane confortable nichée au cœur des montagnes. Profitez de vues à couper le souffle et d'un environnement paisible.",
    location: 'Asheville, NC',
    imageUrl: 'https://picsum.photos/id/30/400/300',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 175,
    amenities: ['WiFi', 'Cuisine', 'Cheminée', 'Jacuzzi'],
    reviews: ['Emplacement incroyable', 'Très propre et bien entretenu'],
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: '2',
    name: 'Maison de Plage Vue Océan',
    description: "Détendez-vous dans cette superbe maison de plage avec vue panoramique sur l'océan. Parfait pour une escapade en famille ou une escapade romantique.",
    location: 'Malibu, CA',
    imageUrl: 'https://picsum.photos/id/40/400/300',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 250,
    amenities: ['WiFi', 'Accès à la plage', 'Balcon', 'Animaux acceptés'],
    reviews: ['Vue incroyable', 'Parfait pour les familles', 'Excellent rapport qualité-prix'],
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: '3',
    name: 'Charmant Cottage au Bord du Lac',
    description: "Découvrez la tranquillité de la vie au bord du lac dans ce charmant cottage. Profitez de la baignade, de la pêche et de la navigation de plaisance directement depuis votre porte.",
    location: 'Lake Tahoe, CA',
    imageUrl: 'https://picsum.photos/id/50/400/300',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 200,
    amenities: ['WiFi', 'Cuisine', 'Quai', 'Kayaks'],
    reviews: ['Beau lac', 'Calme et reposant', 'Bien équipé'],
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
  },
    {
    id: '4',
    name: 'Retraite Rustique dans le Désert',
    description: "Découvrez la beauté du désert dans cette retraite rustique. Profitez de l'observation des étoiles, de la randonnée et de l'exploration du paysage unique.",
    location: 'Sedona, AZ',
    imageUrl: 'https://picsum.photos/id/60/400/300',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 150,
    amenities: ['WiFi', 'Cuisine', 'Foyer', 'Sentiers de randonnée'],
    reviews: ["Observation des étoiles incroyable", 'Paisible et isolée', 'Super randonnée'],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: '5',
    name: 'Appartement Chic et Urbain',
    description: "Découvrez la vie citadine dans cet appartement élégant et moderne. Profitez d'un accès facile aux restaurants, aux boutiques et aux attractions.",
    location: 'New York, NY',
    imageUrl: 'https://picsum.photos/id/70/400/300',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 300,
    amenities: ['WiFi', 'Gym', 'Concierge', 'Vues sur la ville'],
    reviews: ['Super emplacement', 'Élégant et moderne', 'Excellentes commodités'],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: '6',
    name: 'Bungalow Tropical sur l\'Île',
    description: "Évadez-vous au paradis dans ce charmant bungalow insulaire. Profitez de plages de sable blanc, d'eaux cristallines et d'une végétation tropicale luxuriante.",
    location: 'Maui, HI',
    imageUrl: 'https://picsum.photos/id/80/400/300',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 275,
    amenities: ['WiFi', 'Accès à la plage', 'Snorkeling', 'Hamac'],
    reviews: ['Paradis trouvé', 'Snorkeling incroyable', 'Ambiance relaxante'],
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
  },
];

interface PropertyListProps {
  locationFilter: string;
}

const PropertyList: React.FC<PropertyListProps> = ({locationFilter}) => {
  const filteredProperties = locationFilter === 'all'
    ? dummyProperties
    : dummyProperties.filter(property => property.location === locationFilter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProperties.map((property) => (
        <PropertyCard key={property.id} property={property}/>
      ))}
    </div>
  );
};

export default PropertyList;
