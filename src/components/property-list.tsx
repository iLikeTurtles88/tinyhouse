"use client"

import React from 'react';
import PropertyCard from '@/components/property-card';

const dummyProperties = [
  {
    id: '1',
    name: 'Secluded Mountain Cabin',
    description: 'Escape to this cozy cabin nestled in the heart of the mountains. Enjoy breathtaking views and peaceful surroundings.',
    location: 'Asheville, NC',
    imageUrl: 'https://picsum.photos/id/30/400/300',
    price: 175,
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Hot Tub'],
    reviews: ['Incredible location', 'Very clean and well-maintained'],
  },
  {
    id: '2',
    name: 'Ocean View Beach House',
    description: 'Relax in this stunning beach house with panoramic ocean views. Perfect for a family getaway or a romantic escape.',
    location: 'Malibu, CA',
    imageUrl: 'https://picsum.photos/id/40/400/300',
    price: 250,
    amenities: ['WiFi', 'Beach Access', 'Balcony', 'Pet-Friendly'],
    reviews: ['Unbelievable view', 'Perfect for families', 'Great value'],
  },
  {
    id: '3',
    name: 'Charming Lakefront Cottage',
    description: 'Experience the tranquility of lakefront living in this charming cottage. Enjoy swimming, fishing, and boating right from your doorstep.',
    location: 'Lake Tahoe, CA',
    imageUrl: 'https://picsum.photos/id/50/400/300',
    price: 200,
    amenities: ['WiFi', 'Kitchen', 'Dock', 'Kayaks'],
    reviews: ['Beautiful lake', 'Quiet and relaxing', 'Well equipped'],
  },
  {
    id: '4',
    name: 'Rustic Desert Retreat',
    description: 'Discover the beauty of the desert in this rustic retreat. Enjoy stargazing, hiking, and exploring the unique landscape.',
    location: 'Sedona, AZ',
    imageUrl: 'https://picsum.photos/id/60/400/300',
    price: 150,
    amenities: ['WiFi', 'Kitchen', 'Fire Pit', 'Hiking Trails'],
    reviews: ['Amazing stargazing', 'Peaceful and secluded', 'Great hiking'],
  },
  {
    id: '5',
    name: 'Urban Chic Apartment',
    description: 'Experience city living in this stylish and modern apartment. Enjoy easy access to restaurants, shops, and attractions.',
    location: 'New York, NY',
    imageUrl: 'https://picsum.photos/id/70/400/300',
    price: 300,
    amenities: ['WiFi', 'Gym', 'Concierge', 'City Views'],
    reviews: ['Great location', 'Stylish and modern', 'Excellent amenities'],
  },
  {
    id: '6',
    name: 'Tropical Island Bungalow',
    description: 'Escape to paradise in this charming island bungalow. Enjoy white sand beaches, crystal clear waters, and lush tropical vegetation.',
    location: 'Maui, HI',
    imageUrl: 'https://picsum.photos/id/80/400/300',
    price: 275,
    amenities: ['WiFi', 'Beach Access', 'Snorkeling', 'Hammock'],
    reviews: ['Paradise found', 'Amazing snorkeling', 'Relaxing atmosphere'],
  },
];

const PropertyList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummyProperties.map((property) => (
        <PropertyCard key={property.id} property={property}/>
      ))}
    </div>
  );
};

export default PropertyList;
