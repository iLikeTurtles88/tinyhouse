"use client";

import React, {useState} from 'react';
import PropertyCard from '@/components/property-card';

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
      '/images/cottage_lac_3.jpg',
      '/images/cottage_lac_4.jpg',
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

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedProperty(null);
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

      {selectedProperty && (
        <PropertyBookingModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          property={selectedProperty}
        />
      )}
    </div>
  );
};

interface PropertyBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

const PropertyBookingModal: React.FC<PropertyBookingModalProps> = ({isOpen, onClose, property}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const numberOfDays = startDate && endDate ?
    Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) : 0;
  const totalPrice = numberOfDays * property.price;

  const confirmBooking = () => {
    alert(`Réservation confirmée pour ${property.name} du ${startDate?.toLocaleDateString()} au ${endDate?.toLocaleDateString()} pour ${totalPrice}€!`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-background rounded-lg shadow-xl p-8 max-w-md m-4">
          <h2 className="text-3xl font-bold mb-4">Réserver {property.name}</h2>
          <p className="text-gray-600 mb-4">{property.description}</p>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dates">
              Sélectionner les dates:
            </label>
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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom:
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Téléphone:
            </label>
            <input
              type="tel"
              id="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-secondary hover:bg-accent text-accent-foreground font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={onClose}>
              Annuler
            </button>
            <button
              className="bg-primary hover:bg-primary-foreground text-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={confirmBooking}>
              Confirmer la réservation - {totalPrice}€
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {useState as useHooksState} from "react";

function DateRangePicker({onDateChange}: { onDateChange: (dates: { from?: Date, to?: Date }) => void }) {
  const [date, setDate] = useHooksState<{ from?: Date, to?: Date } | undefined>(undefined);

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

export default PropertyList;
