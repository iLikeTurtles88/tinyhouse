"use client";

import React, {useState} from 'react';
import PropertyCard from '@/components/property-card';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Mail, Phone} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "@/hooks/use-toast";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
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

const dummyProperties: Property[] = [
  {
    id: '1',
    name: 'Cabane Montagnarde Isolée',
    description: "Évadez-vous dans cette cabane confortable nichée au cœur des montagnes. Profitez de vues à couper le souffle et d'un environnement paisible.",
    location: 'Ardennes, Belgique',
    imageUrls: [
      '/images/cabane_montagnarde_1.jpg',
      '/images/cabane_montagnarde_2.jpg',
      '/images/cabane_montagnarde_3.jpg',
    ],
    price: 175,
    amenities: ['WiFi', 'Cuisine', 'Cheminée', 'Jacuzzi'],
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    ownerContact: "Sophie Dubois",
    bookingEmail: "sophie.dubois@example.com"
  },
  {
    id: '2',
    name: 'Maison de Plage Vue Océan',
    description: "Détendez-vous dans cette superbe maison de plage avec vue panoramique sur l'océan. Parfait pour une escapade en famille ou une escapade romantique.",
    location: 'Knokke, Belgique',
    imageUrls: [
      '/images/maison_plage_1.jpg',
      '/images/maison_plage_2.jpg',
    ],
    price: 250,
    amenities: ['WiFi', 'Accès à la plage', 'Balcon', 'Animaux acceptés'],
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    ownerContact: "Jean-Luc Picard",
    bookingEmail: "jean-luc.picard@example.com"
  },
  {
    id: '3',
    name: 'Charmant Cottage au Bord du Lac',
    description: "Découvrez la tranquillité de la vie au bord du lac dans ce charmant cottage. Profitez de la baignade, de la pêche et de la navigation de plaisance directement depuis votre porte.",
    location: 'Gand, Belgique',
    imageUrls: [
      '/images/cottage_lac_1.jpg',
      '/images/cottage_lac_2.jpg',
    ],
    price: 200,
    amenities: ['WiFi', 'Cuisine', 'Quai', 'Kayaks'],
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    ownerContact: "Marie Dupont",
    bookingEmail: "marie.dupont@example.com"
  },
  {
    id: '4',
    name: 'Retraite Rustique dans le Désert',
    description: "Découvrez la beauté du désert dans cette retraite rustique. Profitez de l'observation des étoiles, de la randonnée et de l'exploration du paysage unique.",
    location: 'Bruges, Belgique',
    imageUrls: [
      '/images/desert_retreat_1.jpg',
      '/images/desert_retreat_2.jpg',
    ],
    price: 150,
    amenities: ['WiFi', 'Cuisine', 'Foyer', 'Sentiers de randonnée'],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    ownerContact: "Pierre Dubois",
    bookingEmail: "pierre.dubois@example.com"
  },
  {
    id: '5',
    name: 'Appartement Chic et Urbain',
    description: "Découvrez la vie citadine dans cet appartement élégant et moderne. Profitez d'un accès facile aux restaurants, aux boutiques et aux attractions.",
    location: 'Anvers, Belgique',
    imageUrls: [
      '/images/urban_apartment_1.jpg',
      '/images/urban_apartment_2.jpg',
    ],
    price: 300,
    amenities: ['WiFi', 'Salle de gym', 'Concierge', 'Vues sur la ville'],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    ownerContact: "Isabelle Lefevre",
    bookingEmail: "isabelle.lefevre@example.com"
  },
  {
    id: '6',
    name: 'Bungalow Tropical sur l\'Île',
    description: "Évadez-vous au paradis dans ce charmant bungalow insulaire. Profitez de plages de sable blanc, d'eaux cristallines et d'une végétation tropicale luxuriante.",
    location: 'Liège, Belgique',
    imageUrls: [
      '/images/tropical_bungalow_1.jpg',
      '/images/tropical_bungalow_2.jpg',
    ],
    price: 275,
    amenities: ['WiFi', 'Accès à la plage', 'Snorkeling', 'Hamac'],
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    ownerContact: "Thomas Bernard",
    bookingEmail: "thomas.bernard@example.com"
  },
];

const PropertyList: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [comments, setComments] = useState('');

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedProperty(null);
  };

  const numberOfDays = startDate && endDate ?
    Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) : 0;
  const totalPrice = numberOfDays * (selectedProperty?.price || 0);

  const confirmBooking = () => {
    if (!selectedProperty) {
      toast({
        title: "Erreur!",
        description: "Aucune propriété sélectionnée."
      });
      return;
    }

    if (!startDate || !endDate || !name || !email || !phone) {
      toast({
        title: "Erreur!",
        description: "Veuillez remplir tous les champs."
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Erreur!",
        description: "Veuillez entrer une adresse email valide."
      });
      return;
    }

    alert(`Réservation confirmée pour ${selectedProperty.name} du ${startDate?.toLocaleDateString()} au ${endDate?.toLocaleDateString()} pour ${totalPrice}€!\n\nUn email de confirmation sera envoyé à ${email}.`);
    onClose();
  };

  const DateRangePicker = ({onDateChange}: { onDateChange: (dates: { from?: Date, to?: Date }) => void }) => {
    const [date, setDate] = React.useState<{ from?: Date, to?: Date } | undefined>(undefined);

    React.useEffect(() => {
      onDateChange(date || {});
    }, [date, onDateChange]);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {date?.from ? (
              date.to ? (
                `${format(date.from, "dd/MM/yyyy")} - ${format(date.to, "dd/MM/yyyy")}`
              ) : (
                format(date.from, "dd/MM/yyyy")
              )
            ) : (
              <span>Choisir les dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center" side="bottom">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    )
  }

  const onClose = () => {
    setIsBookingModalOpen(false);
    setSelectedProperty(null);
    setStartDate(undefined);
    setEndDate(undefined);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCity('');
    setPostalCode('');
    setCountry('');
    setAdults(1);
    setChildren(0);
    setComments('');
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyProperties.map((property) => (
          <div
            key={property.id}
            onClick={() => handlePropertyClick(property)}
            style={{cursor: 'pointer'}}
          >
            <PropertyCard property={property}/>
          </div>
        ))}
      </div>

      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Réserver {selectedProperty?.name}</DialogTitle>
            <DialogDescription>
              {selectedProperty?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom:
              </Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email:
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Téléphone:
              </Label>
              <Input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Adresse:
              </Label>
              <Input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                Ville:
              </Label>
              <Input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="postalCode" className="text-right">
                Code Postal:
              </Label>
              <Input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                Pays:
              </Label>
              <Input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adults" className="text-right">
                Adultes:
              </Label>
              <select
                id="adults"
                className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
              >
                {Array.from({ length: selectedProperty?.capacity || 4 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="children" className="text-right">
                Enfants:
              </Label>
              <select
                id="children"
                className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
              >
                {Array.from({ length: selectedProperty ? selectedProperty.capacity - adults : 0 }, (_, i) => i).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dates" className="text-right">
                Sélectionner les dates:
              </Label>
              <div className="col-span-3">
                <DateRangePicker
                  onDateChange={(dates) => {
                    setStartDate(dates?.from);
                    setEndDate(dates?.to);
                  }}
                />
                {startDate && endDate && (
                  <p className="text-sm text-gray-500 mt-2">
                    {numberOfDays} nuits - {totalPrice}€
                  </p>
                )}
              </div>
            </div>
            {totalPrice > 0 && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Prix total:
                </Label>
                <div className="col-span-3 font-bold">
                  {totalPrice}€
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comments" className="text-right">
                Commentaires:
              </Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="col-span-3"
                placeholder="Ajouter des commentaires ou demandes spéciales"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={onClose}>
              Annuler
            </Button>
            <Button type="button" onClick={confirmBooking}>
              Confirmer la réservation - {totalPrice}€
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyList;
