"use client"

import React from 'react';
import PropertyCard from '@/components/property-card';

const dummyProperties = [
  {
    id: '1',
    name: 'Cozy Cabin',
    description: 'A beautiful cozy cabin in the woods.',
    location: 'Mountains',
    imageUrl: 'https://picsum.photos/id/10/400/300',
    price: 150,
    amenities: ['WiFi', 'Kitchen', 'Fireplace'],
    reviews: ['Great location', 'Very clean'],
  },
  {
    id: '2',
    name: 'Beach House',
    description: 'A relaxing beach house with ocean view.',
    location: 'Beach',
    imageUrl: 'https://picsum.photos/id/20/400/300',
    price: 200,
    amenities: ['WiFi', 'Beach Access', 'Balcony'],
    reviews: ['Amazing view', 'Perfect for families'],
  },
];

const PropertyList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummyProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
