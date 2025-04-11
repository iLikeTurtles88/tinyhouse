// src/components/property-card.tsx

"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // <--- Importer les composants Tooltip
import { Bed, Bath, Users, MapPin } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getAmenityIcon } from "@/lib/amenity-icons"; // Import getAmenityIcon (AmenityItem n'est plus utilisé ici)

// --- Interface Property ---
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
  onSelectProperty: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
}) => {
  return (
    <Card
      className={cn(
        "bg-card text-card-foreground",
        "shadow-md overflow-hidden rounded-lg cursor-pointer border border-border/50",
        "hover:scale-[1.03] hover:shadow-lg",
        "transition-all duration-300 ease-in-out"
      )}
      onClick={() => onSelectProperty(property)}
    >
      {/* Section Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={property.imageUrls[0] ?? "/images/placeholder.jpg"} // Fallback image
          alt={`Vue principale de ${property.name}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.jpg";
          }} // Basic image error fallback
        />
      </div>

      {/* Section Contenu Texte */}
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-1">
          {property.name}
        </CardTitle>
        <CardDescription className="text-sm flex items-center pt-1">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0 text-muted-foreground" />
          {property.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {/* Description courte */}
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2 h-[2.5rem]">
          {property.description}
        </p>

        {/* Détails Clés (Capacité, Chambres, SdB) */}
        <div className="flex items-center justify-start space-x-4 mb-3 text-sm border-t border-border/50 pt-3 mt-3">
          <div
            className="flex items-center text-muted-foreground"
            title={`Capacité: ${property.capacity} personne(s)`}
          >
            <Users className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{property.capacity} pers.</span>
          </div>
          <div
            className="flex items-center text-muted-foreground"
            title={`${property.bedrooms} Chambre(s)`}
          >
            <Bed className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{property.bedrooms} ch.</span>
          </div>
          <div
            className="flex items-center text-muted-foreground"
            title={`${property.bathrooms} Salle(s) de bain`}
          >
            <Bath className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{property.bathrooms} sdb.</span>
          </div>
        </div>

        {/* Équipements principaux (Icônes avec Tooltip Shadcn) */}
        <div className="flex items-center space-x-3 mb-4 min-h-[20px]">
          {" "}
          {/* min-h pour éviter le saut de layout */}
          {/* Envelopper la section des tooltips avec TooltipProvider */}
          <TooltipProvider delayDuration={100}>
            {property.amenities.slice(0, 4).map((amenity) => {
              const Icon = getAmenityIcon(amenity);
              return (
                // Utiliser Tooltip pour chaque icône
                <Tooltip key={amenity}>
                  <TooltipTrigger asChild>
                    {/* Le span est utile pour le curseur et comme déclencheur */}
                    <span className="cursor-help p-1 rounded-full hover:bg-muted/50 transition-colors">
                      {" "}
                      {/* Style au survol */}
                      <Icon className="h-5 w-5 text-muted-foreground/80 block" />{" "}
                      {/* block pour éviter espace sous l'icône */}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{amenity}</p> {/* Le texte du tooltip */}
                  </TooltipContent>
                </Tooltip>
              );
            })}

            {/* Tooltip pour les "..." */}
            {property.amenities.length > 4 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm font-medium text-muted-foreground/70 cursor-help self-center px-1">
                    ...
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Et d'autres équipements</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>{" "}
          {/* Fin TooltipProvider */}
        </div>

        {/* Prix */}
        <p className="font-semibold text-lg text-right">
          {property.price}€
          <span className="text-sm font-normal text-muted-foreground">
            {" "}
            / nuit
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
