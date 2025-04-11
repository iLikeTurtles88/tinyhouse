"use client";

import React, {useEffect, useState} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Bed, Bath, Users} from 'lucide-react';
import Image from "next/image";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

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
  ownerContact: string; // Added owner contact info
  bookingEmail: string; // Added booking email
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({property}) => {
  const {toast} = useToast();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [updatedReviews, setUpdatedReviews] = useState(property.reviews);
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const handleAddReview = () => {
    if (newReview.trim() !== '') {
      setUpdatedReviews([...updatedReviews, newReview]);
      setNewReview('');
      setIsReviewDialogOpen(false);
      toast({
        title: 'Avis ajouté avec succès!',
        description: 'Votre avis a été ajouté à la liste.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Veuillez entrer un avis valide.',
      });
    }
  };
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
            style={{ objectFit: 'cover' }}
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

        <p className="font-bold mb-3">Prix: ${property.price} / nuit</p>

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

        {/* Reviews Section */}
        <section className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Avis des clients</h3>
          <ScrollArea className="h-[150px] w-full rounded-md border p-3">
            {updatedReviews.length > 0 ? (
              <ul className="list-disc pl-5 text-sm">
                {updatedReviews.map((review, index) => (
                  <li key={index} className="mb-1">
                    {review}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">Aucun avis disponible pour le moment.</p>
            )}
          </ScrollArea>
          <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-2">
                Ajouter un avis
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un avis</DialogTitle>
                <DialogDescription>
                  Partagez votre expérience avec cette tiny house.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="review">Votre avis</Label>
                  <Textarea
                    id="review"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Écrivez votre avis ici"
                  />
                </div>
              </div>
              <Button type="submit" onClick={handleAddReview}>
                Soumettre
              </Button>
            </DialogContent>
          </Dialog>
        </section>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div>
          Contact : {property.ownerContact}
          <br/>
          Email : {property.bookingEmail}
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium">Sélectionnez les dates de réservation:</p>
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          {date?.from && date?.to ? (
            <p className="text-sm mt-2">
              Vous avez sélectionné du {format(date.from, "PPP")} au {format(date.to, "PPP")}
            </p>
          ) : (
            <p className="text-sm mt-2">Veuillez sélectionner une plage de dates.</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
