"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Mail, Phone, Bed, Bath, Users} from 'lucide-react';
import Image from "next/image";

interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrls: string[];
  price: number;
  amenities: string[];
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  ownerContact: string;
  bookingEmail: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({property}) => {

  return (
    <Card className="bg-secondary shadow-md overflow-hidden rounded-lg">
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-semibold">{property.name}</CardTitle>
        <CardDescription className="text-gray-500">{property.location}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {/* Image Gallery */}
        <div className="relative h-64 mb-4 rounded-md overflow-hidden">
          <Image
            src={property.imageUrls[0]}
            alt={`${property.name} - Vue générale`}
            fill
            style={{objectFit: 'cover'}}
            className="transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Property Details */}
        <p className="mb-3 text-gray-700">{property.description}</p>

        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center text-gray-600">
            <Bed className="h-5 w-5 mr-1"/>
            <span>{property.bedrooms} Chambres</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Bath className="h-5 w-5 mr-1"/>
            <span>{property.bathrooms} Salles de bain</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-5 w-5 mr-1"/>
            <span>{property.capacity} Invités</span>
          </div>
        </div>

        <p className="font-bold mb-3">Prix: {property.price}€ / nuit</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.map((amenity) => (
            <span
              key={amenity}
              className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm"
            >
              {amenity}
            </span>
          ))}
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <Mail className="h-4 w-4 text-gray-500"/>
            <a href={`mailto:${property.bookingEmail}`} className="text-sm text-gray-600 hover:text-gray-800">
              {property.bookingEmail}
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <Phone className="h-4 w-4 text-gray-500"/>
            <span className="text-sm text-gray-600">{property.ownerContact}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
