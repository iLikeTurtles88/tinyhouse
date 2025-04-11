"use client";

import React, {useState, useEffect} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
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
  DialogFooter,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";
import {Mail, Phone, Bed, Bath, Users} from 'lucide-react';
import Image from "next/image";
import {DateRange} from "react-day-picker";
import {format, differenceInDays} from "date-fns";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CardFooter} from "@/components/ui/card";

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
        setBookingError('Veuillez entrer un numéro de téléphone valide (10 chiffres).',
        );
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
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
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
        <Button onClick={handleBooking}>Réserver</Button>
      </CardFooter>

      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        
          
            
              Informations de réservation
            
            
              
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
              
            

            {/* Image Carousel in Booking Modal */}
            <div className="relative w-full h-64 rounded-md overflow-hidden mb-4">
              {property.imageUrls.map((imageUrl, index) => (
                <div key={index} className="absolute inset-0 transition-transform duration-500">
                  <Image
                    src={imageUrl}
                    alt={`${property.name} - Image ${index + 1}`}
                    fill
                    style={{objectFit: 'cover'}}
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                  Votre Nom
                  <Input
                    type="text"
                    id="name"
                    placeholder="Votre Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                
                
                  Votre Email
                  <Input
                    type="email"
                    id="email"
                    placeholder="Votre Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                  Votre Adresse
                  <Input
                    type="text"
                    id="address"
                    placeholder="Votre Adresse"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                
                
                  Votre Numéro de Téléphone
                  <Input
                    type="tel"
                    id="phone"
                    placeholder="Votre Numéro de Téléphone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                  Nombre d'adultes
                  <Select value={adults.toString()} onValueChange={(value) => setAdults(parseInt(value))}>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      {Array.from({length: property.capacity}, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                
                
                  Nombre d'enfants
                  <Select value={children.toString()} onValueChange={(value) => setChildren(parseInt(value))}>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      {Array.from({length: property.capacity - adults}, (_, i) => i).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                
              </div>

              
                Demandes additionnelles
                <Textarea
                  id="additionalRequests"
                  placeholder="Besoin d'un lit bébé? Allergies?"
                  value={additionalRequests}
                  onChange={(e) => setAdditionalRequests(e.target.value)}
                  rows={3}
                />
              
            </div>
            {bookingError && (
              
                {bookingError}
              
            )}

            <DialogFooter>
              <Button type="button" onClick={confirmBooking}>
                Confirmer la réservation - {totalPrice}€
              </Button>
            </DialogFooter>
          
        
      </Dialog>
    </Card>
  );
};

export default PropertyCard;
