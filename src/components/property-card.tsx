"use client"

import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";

interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  videoUrl: string;
  price: number;
  amenities: string[];
  reviews: string[];
  capacity: number;
  bedrooms: number;
  bathrooms: number;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({property}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{property.name}</CardTitle>
        <CardDescription>{property.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={property.imageUrl} alt={property.name} className="w-full h-48 object-cover mb-4 rounded-md"/>
        <video src={property.videoUrl} className="w-full aspect-video rounded-md" controls muted/>
        <p>{property.description}</p>
        <p className="font-bold mt-2">Prix: ${property.price}</p>
        <p>Capacité: {property.capacity} invités</p>
        <p>Chambres: {property.bedrooms}</p>
        <p>Salles de bain: {property.bathrooms}</p>
        <div className="flex space-x-2 mt-2">
          {property.amenities.map((amenity) => (
            <span key={amenity} className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{amenity}</span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Réserver</Button>
        <Calendar/>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
