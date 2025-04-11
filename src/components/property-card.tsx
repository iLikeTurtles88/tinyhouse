"use client";

import React, {useState, useEffect} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter // Import CardFooter
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter as DialogFooterRadix,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Bed, Bath, Users, Mail, Phone} from 'lucide-react';
import Image from "next/image";
import {DateRange} from "react-day-picker";
import {format, differenceInDays} from "date-fns";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

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

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({property}) => {
  const {toast} = useToast();
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalRequests, setAdditionalRequests] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);


  // Recalculate total price when date or price changes
  useEffect(() => {
    if (date?.from && date?.to) {
      const numberOfNights = differenceInDays(date.to, date.from);
      setTotalPrice(numberOfNights * property.price);
    } else {
      setTotalPrice(0);
    }
  }, [date, property.price]);

  const handleBooking = () => {
    if (date?.from && date?.to) {
      setIsBookingDialogOpen(true);
      setBookingError(null); // Reset booking error when the dialog opens

    } else {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Veuillez sélectionner une plage de dates pour effectuer une réservation.',
      });
      setBookingError('Veuillez sélectionner une plage de dates pour effectuer une réservation.');
    }
  };

  const confirmBooking = () => {
    if (name.trim() !== '' && email.trim() !== '' && address.trim() !== '' && phone.trim() !== '') {
      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Veuillez entrer une adresse e-mail valide.',
        });
        setBookingError('Veuillez entrer une adresse e-mail valide.');
        return;
      }

      // Basic phone number validation
      if (!/^\d{10}$/.test(phone)) {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Veuillez entrer un numéro de téléphone valide (10 chiffres).',
        });
        setBookingError('Veuillez entrer un numéro de téléphone valide (10 chiffres).');
        return;
      }

      localStorage.setItem(`booking_${property.id}`, JSON.stringify({
        date,
        name,
        email,
        address,
        phone,
        additionalRequests,
        adults,
        children,
        totalPrice
      }));

      toast({
        title: 'Réservation Confirmée!',
        description: `Votre réservation du ${format(date.from!, "PPP")} au ${format(date.to!, "PPP")} pour un total de ${totalPrice}€ est confirmée.`,
      });
      setTimeout(() => {
        setIsBookingDialogOpen(false);
        setName('');
        setEmail('');
        setAddress('');
        setPhone('');
        setAdditionalRequests('');
        setAdults(1);
        setChildren(0);
        setDate(undefined);
        setBookingError(null);
      }, 3000);
    } else {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs du formulaire.',
      });
      setBookingError('Veuillez remplir tous les champs du formulaire.');
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
        <div className="relative h-64 mb-4 rounded-md overflow-hidden cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
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
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div>
          <div className="flex items-center space-x-1">
            <Mail className="h-4 w-4 text-gray-500"/>
            <span>{property.bookingEmail}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Phone className="h-4 w-4 text-gray-500"/>
            <span>{property.ownerContact}</span>
          </div>
        </div>


        <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{property.name}</DialogTitle>
              <DialogDescription>
                {property.description}
                <br/>
                {property.location}
                <br/>
                Prix: {property.price}€ / nuit
              </DialogDescription>
            </DialogHeader>

            {/* Calendar and Booking Section */}
            <div className="mt-4">
              <p className="text-sm font-medium">Sélectionnez les dates de réservation:</p>
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                defaultMonth={new Date()} // Sets the current month as the default
                fromMonth={new Date()}
              />
              {date?.from && date?.to ? (
                <p className="text-sm mt-2">
                  Vous avez sélectionné du {format(date.from, "PPP")} au {format(date.to, "PPP")}
                </p>
              ) : (
                <p className="text-sm mt-2">Veuillez sélectionner une plage de dates.</p>
              )}
            </div>
            <Button onClick={handleBooking} className="mt-4" disabled={!date?.from || !date?.to}>
              Réserver
            </Button>

            {/* Booking Information Dialog */}
            <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Informations de réservation</DialogTitle>
                  <DialogDescription>
                    {date?.from && date?.to ? (
                      <>
                        Vous avez sélectionné du {format(date.from, "PPP")} au {format(date.to, "PPP")}.
                        <br/>
                        Prix total: {totalPrice}€
                        <br/>
                        Veuillez entrer vos informations pour confirmer la réservation.
                      </>
                    ) : (
                      'Veuillez entrer vos informations pour confirmer la réservation.'
                    )}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="address">Votre Adresse</Label>
                      <Input
                        type="text"
                        id="address"
                        placeholder="Votre Adresse"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Votre Numéro de Téléphone</Label>
                      <Input
                        type="tel"
                        id="phone"
                        placeholder="Votre Numéro de Téléphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="adults">Nombre d'adultes</Label>
                      <Select value={adults.toString()} onValueChange={(value) => setAdults(parseInt(value))}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="1"/>
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({length: property.capacity}, (_, i) => i + 1).map((num) => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="children">Nombre d'enfants</Label>
                      <Select value={children.toString()} onValueChange={(value) => setChildren(parseInt(value))}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="0"/>
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({length: property.capacity - adults}, (_, i) => i).map((num) => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="additionalRequests">Demandes additionnelles</Label>
                    <Textarea
                      id="additionalRequests"
                      placeholder="Besoin d'un lit bébé? Allergies?"
                      value={additionalRequests}
                      onChange={(e) => setAdditionalRequests(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                {bookingError && (
                  <p className="mt-4 text-center text-red-500">{bookingError}</p>
                )}

                <DialogFooterRadix>
                  <Button type="button" onClick={confirmBooking}>
                    Confirmer la réservation - {totalPrice}€
                  </Button>
                </DialogFooterRadix>
              </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
