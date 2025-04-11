"use client";

import React, {useState} from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Bed, Bath, Users} from 'lucide-react';
import Image from "next/image";
import {DateRange} from "react-day-picker";
import {format} from "date-fns";
import {Textarea} from "@/components/ui/textarea"; // Import Textarea

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
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handleBooking = () => {
    if (date?.from && date?.to) {
      setIsBookingDialogOpen(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Veuillez sélectionner une plage de dates pour effectuer une réservation.',
      });
    }
  };

  const confirmBooking = () => {
    if (name.trim() !== '' && email.trim() !== '') {
      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Veuillez entrer une adresse e-mail valide.',
        });
        return;
      }

      localStorage.setItem(`booking_${property.id}`, JSON.stringify({date, name, email}));
      setIsBookingConfirmed(true);

      toast({
        title: 'Réservation Confirmée!',
        description: `Votre réservation du ${format(date.from!, "PPP")} au ${format(date.to!, "PPP")} est confirmée.`,
      });
      setTimeout(() => {
        setIsBookingDialogOpen(false);
        setIsBookingConfirmed(false);
        setName('');
        setEmail('');
        setDate(undefined);
      }, 3000);
    } else {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Veuillez entrer votre nom et votre adresse e-mail.',
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
        <Button onClick={handleBooking} className="mt-4" disabled={isBookingConfirmed}>
          {isBookingConfirmed ? 'Réservation Confirmée!' : 'Réserver'}
        </Button>
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Informations de réservation</DialogTitle>
              <DialogDescription>
                {date?.from && date?.to ? (
                  <>
                    Vous avez sélectionné du {format(date.from, "PPP")} au {format(date.to, "PPP")}.<br/>
                    Entrez votre nom et votre adresse e-mail pour confirmer la réservation.
                  </>
                ) : (
                  'Entrez votre nom et votre adresse e-mail pour confirmer la réservation.'
                )}
              </DialogDescription>
            </DialogHeader>
            {isBookingConfirmed ? (
              <div className="flex justify-center items-center h-24">
                <p className="text-green-500">Réservation Confirmée!</p>
              </div>
            ) : (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Votre Nom</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Votre Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Votre Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Votre Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" onClick={confirmBooking}>
                  Confirmer la réservation
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
