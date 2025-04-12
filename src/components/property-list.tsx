// src/components/property-list.tsx

"use client";

import React, { useState } from "react";
import PropertyCard from "@/components/property-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Bed, Bath, Users, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AmenityItem } from "@/lib/amenity-icons";
import { motion } from "framer-motion"; // Importer motion
import type { DateRange } from "react-day-picker";

// --- Imports pour le Lightbox ---
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
// --- Fin Imports Lightbox ---

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

// --- Realistic Dummy Properties ---
const dummyProperties: Property[] = [
  {
    id: "1",
    name: "Le Petit Refuge Ardennais",
    description:
      "Tiny house cosy nichée au cœur des forêts ardennaises. Parfait pour une déconnexion totale, avec poêle à bois et terrasse privée. Idéal pour les randonneurs.",
    location: "Profondeville, Ardennes",
    imageUrls: [
      "/images/ardennes_1.jpg",
      "/images/ardennes_2.jpg",
      "/images/ardennes_3.jpg",
      "/images/ardennes_4.jpg",
    ],
    price: 115,
    amenities: ["WiFi", "Kitchenette", "Poêle à bois", "Terrasse", "Nature"],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    ownerContact: "Sophie Dubois",
    bookingEmail: "sophie.dubois@example.com",
  },
  {
    id: "2",
    name: "Tiny House 'Brise Marine'",
    description:
      "Échappez-vous dans cette tiny house lumineuse à deux pas de la mer du Nord. Design épuré, optimisation de l'espace et accès facile à la plage.",
    location: "De Haan (près de Knokke)",
    imageUrls: ["/images/knokke_1.jpg", "/images/knokke_2.jpg"], // Assuming only 2 images
    price: 140,
    amenities: ["WiFi", "Kitchenette", "Terrasse", "Proche plage", "Parking"],
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    ownerContact: "Lucas Mertens",
    bookingEmail: "lucas.mertens@example.com",
  },
  {
    id: "3",
    name: "La Cabane Flottante (Gand)",
    description:
      "Expérience unique sur l'eau dans cette tiny house flottante amarrée près de Gand. Calme, vue sur le canal, et design minimaliste.",
    location: "Watersportbaan, Gand",
    imageUrls: ["/images/gand_1.jpg", "/images/gand_2.jpg"],
    price: 130,
    amenities: ["WiFi", "Kitchenette", "Terrasse sur l eau", "Kayak"],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    ownerContact: "Marie Dupont",
    bookingEmail: "marie.dupont@example.com",
  },
  {
    id: "4",
    name: "Micro-Maison 'Campagne Brugeoise'",
    description:
      "Retraite paisible dans cette tiny house située dans la campagne autour de Bruges. Idéal pour explorer la région à vélo. Simplicité et confort.",
    location: "Damme (près de Bruges)",
    imageUrls: [
      "/images/bruges_1.jpg",
      "/images/bruges_2.jpg",
      "/images/bruges_3.jpg",
      "/images/bruges_4.jpg",
    ],
    price: 105,
    amenities: ["WiFi", "Kitchenette", "Jardin", "Pret de velos", "BBQ"],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    ownerContact: "Pierre Dubois",
    bookingEmail: "pierre.dubois@example.com",
  },
  {
    id: "5",
    name: "Tiny Container Urbain (Anvers)",
    description:
      "Séjour insolite dans un container maritime réaménagé en tiny house design, avec petit jardin privé en ville. Proche des centres d'intérêt d'Anvers.",
    location: "Berchem, Anvers",
    imageUrls: [
      "/images/anvers_1.jpg",
      "/images/anvers_2.jpg",
      "/images/anvers_3.jpg",
    ],
    price: 95,
    amenities: ["WiFi", "Kitchenette", "Jardin prive", "Design", "Parking"],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    ownerContact: "Isabelle Lefevre",
    bookingEmail: "isabelle.lefevre@example.com",
  },
  {
    id: "6",
    name: "Tiny House 'Au Coeur du Condroz'",
    description:
      "Charmante tiny house autonome (panneaux solaires) dans les paysages vallonnés du Condroz, près de Liège. Silence, nature et ciel étoilé garantis.",
    location: "Modave (Condroz, près de Liège)",
    imageUrls: [
      "/images/liege_1.jpg",
      "/images/liege_2.jpg",
      "/images/liege_3.jpg",
      "/images/liege_4.jpg",
    ],
    price: 125,
    amenities: [
      "Kitchenette",
      "Panneaux solaires",
      "Toilettes seches",
      "Terrasse",
      "Vue degagee",
    ],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    ownerContact: "Thomas Bernard",
    bookingEmail: "thomas.bernard@example.com",
  },
];
// --- END OF DUMMY DATA ---

const PropertyList: React.FC = () => {
  // --- State Declarations ---
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [comments, setComments] = useState("");
  // States for Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // --- End of State Declarations ---

  // --- Event Handlers ---
  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setAdults(1); // Reset guests to default
    setChildren(0);
    setIsBookingModalOpen(true);
  };

  // Fonction de réinitialisation/fermeture propre
  const closeAndResetAll = () => {
    setIsBookingModalOpen(false);
    setLightboxOpen(false);
    // Resetting state immediately
    setSelectedProperty(null);
    setStartDate(undefined);
    setEndDate(undefined);
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("");
    setPostalCode("");
    setCountry("");
    setAdults(1);
    setChildren(0);
    setComments("");
  };

  // Nouvelle logique pour onOpenChange de la Dialog
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (lightboxOpen) {
        setLightboxOpen(false);
      }
      closeAndResetAll();
    } else {
      setIsBookingModalOpen(true);
    }
  };

  // Handler pour ouvrir le lightbox
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Handler pour fermer le lightbox
  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  // Handler pour empêcher la fermeture de la modale lors d'une interaction DANS le lightbox
  const handleModalInteractOutside = (event: Event) => {
    const targetElement = event.target as Element;
    const isInsideLightbox = targetElement?.closest?.(".yarl__root");
    if (isInsideLightbox) {
      event.preventDefault();
    }
  };

  const confirmBooking = () => {
    if (
      !selectedProperty ||
      !startDate ||
      !endDate /* ... autres champs ... */
    ) {
      toast({
        title: "Erreur!",
        description: "Champs requis manquants.",
        variant: "destructive",
      });
      return;
    }
    // ... (autres validations) ...
    console.log("Booking Data:", {
      /* ... */
    });
    toast({ title: "Réservation Simulée!", description: `...` });
    closeAndResetAll();
  };
  // --- End of Event Handlers ---

  // --- Calculations ---
  const numberOfDays =
    startDate && endDate
      ? Math.max(
          0,
          Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
          )
        )
      : 0;
  const totalPrice = numberOfDays * (selectedProperty?.price || 0);
  const lightboxSlides =
    selectedProperty?.imageUrls.map((url) => ({ src: url })) || [];
  // --- End of Calculations ---

  // --- Variantes d'animation pour la grille et les cartes ---
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Délai entre l'apparition de chaque carte
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 }, // Départ: invisible et 30px plus bas
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // Arrivée
  };
  // --- Fin Variantes ---

  return (
    <div>
      {/* --- Property Grid Animée --- */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        // Déclencher l'animation au scroll
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="show" // Animation quand l'élément entre dans le viewport
        viewport={{ once: true, amount: 0.1 }} // Déclencher une fois, quand 10% est visible
      >
        {dummyProperties.map((property) => (
          // Envelopper chaque carte dans un motion.div pour l'animation individuelle
          <motion.div key={property.id} variants={cardVariants}>
            <PropertyCard
              property={property}
              onSelectProperty={handlePropertyClick}
            />
          </motion.div>
        ))}
      </motion.div>
      {/* --- Fin Property Grid Animée --- */}

      {/* --- Booking Modal --- */}
      <Dialog open={isBookingModalOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className="sm:max-w-6xl w-full max-h-[95vh]"
          onInteractOutside={handleModalInteractOutside}
        >
          {selectedProperty && ( // Render content only when property is selected
            <>
              <DialogHeader className="pr-6 pb-0">
                <DialogTitle className="text-2xl font-semibold">
                  {selectedProperty.name}
                </DialogTitle>
                <DialogDescription className="flex items-center text-base pt-1">
                  <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-muted-foreground" />
                  {selectedProperty.location} - {selectedProperty.price}€ / nuit
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="max-h-[calc(95vh-180px)] h-auto px-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Image Column */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold text-lg mb-2 sticky top-0 bg-background py-2 z-10">
                      Photos
                    </h3>
                    {selectedProperty.imageUrls?.map((url, index) => (
                      <motion.div
                        key={url + index}
                        className="relative aspect-video rounded-lg overflow-hidden shadow-md border border-border/50 cursor-pointer group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        onClick={() => openLightbox(index)} // Open lightbox on click
                      >
                        <Image
                          src={url}
                          alt={`${selectedProperty.name} - Image ${index + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                          className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
                          sizes="(max-width: 1200px) 40vw, 500px"
                          loading={index === 0 ? "eager" : "lazy"}
                          onError={(e) => {
                            e.currentTarget.src = "/images/placeholder.jpg";
                          }}
                        />
                        {/* Optional: Add overlay/icon on hover */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                          </svg>
                        </div>
                      </motion.div>
                    ))}
                    {(!selectedProperty.imageUrls ||
                      selectedProperty.imageUrls.length === 0) && (
                      <p className="text-muted-foreground">
                        Pas d'images disponibles.
                      </p>
                    )}
                  </div>

                  {/* Info & Form Column */}
                  <div className="lg:col-span-3 space-y-8">
                    {/* Description & Amenities Section */}
                    <section>
                      <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                        Description
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {selectedProperty.description}
                      </p>
                      <h4 className="font-semibold text-md mb-3">
                        Équipements principaux
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                        {selectedProperty.amenities.map((amenity) => (
                          <AmenityItem key={amenity} amenity={amenity} />
                        ))}
                      </div>
                    </section>

                    {/* Details Section */}
                    <section>
                      <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                        Détails
                      </h3>
                      <div className="flex items-center justify-start space-x-6 text-base">
                        <div
                          className="flex items-center text-foreground"
                          title={`Capacité: ${selectedProperty.capacity} personne(s)`}
                        >
                          <Users className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                          <span>{selectedProperty.capacity} pers. max</span>
                        </div>
                        <div
                          className="flex items-center text-foreground"
                          title={`${selectedProperty.bedrooms} Chambre(s)`}
                        >
                          <Bed className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                          <span>{selectedProperty.bedrooms} ch.</span>
                        </div>
                        <div
                          className="flex items-center text-foreground"
                          title={`${selectedProperty.bathrooms} Salle(s) de bain`}
                        >
                          <Bath className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                          <span>{selectedProperty.bathrooms} sdb.</span>
                        </div>
                      </div>
                    </section>

                    {/* Dates Section */}
                    <section>
                      <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                        Sélectionnez vos dates *
                      </h3>
                      <div className="flex justify-center">
                        <Calendar
                          mode="range"
                          defaultMonth={startDate ?? new Date()}
                          selected={{ from: startDate, to: endDate }}
                          onSelect={(range: DateRange | undefined) => {
                            if (range) {
                              setStartDate(range.from);
                              setEndDate(range.to);
                            } else {
                              setStartDate(undefined);
                              setEndDate(undefined);
                            }
                          }}
                          numberOfMonths={1}
                          disabled={{
                            before: new Date(
                              new Date().setDate(new Date().getDate())
                            ),
                          }}
                          className="rounded-md border p-3 shadow-sm"
                        />
                      </div>
                      {numberOfDays > 0 && (
                        <p className="text-center text-xl font-semibold mt-4">
                          Total ({numberOfDays} nuit
                          {numberOfDays > 1 ? "s" : ""}):
                          <span className="text-primary ml-2">
                            {totalPrice}€
                          </span>
                        </p>
                      )}
                    </section>

                    {/* Personal Info Section */}
                    <section>
                      <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                        Vos informations *
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nom complet *</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Téléphone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Adresse *</Label>
                          <Input
                            id="address"
                            value={address}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setAddress(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">Ville *</Label>
                          <Input
                            id="city"
                            value={city}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setCity(e.target.value)}
                            required
                          />
                        </div>
                        <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="postalCode">Code Postal *</Label>
                            <Input
                              id="postalCode"
                              value={postalCode}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setPostalCode(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="country">Pays *</Label>
                            <Input
                              id="country"
                              value={country}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setCountry(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Guests Section */}
                    <section>
                      <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                        Voyageurs *
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="adults">Adultes</Label>
                          <Select
                            value={String(adults)}
                            onValueChange={(value: string) => {
                              const newAdults = Number(value);
                              if (
                                selectedProperty &&
                                newAdults + children > selectedProperty.capacity
                              ) {
                                setChildren(
                                  Math.max(
                                    0,
                                    selectedProperty.capacity - newAdults
                                  )
                                );
                              }
                              setAdults(newAdults);
                            }}
                          >
                            <SelectTrigger id="adults">
                              <SelectValue placeholder="Adultes" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                { length: selectedProperty?.capacity || 1 },
                                (_, i) => i + 1
                              ).map((num) => (
                                <SelectItem
                                  key={`adult-${num}`}
                                  value={String(num)}
                                >
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="children">Enfants</Label>
                          <Select
                            value={String(children)}
                            onValueChange={(value: string) =>
                              setChildren(Number(value))
                            }
                            disabled={
                              !selectedProperty ||
                              adults >= selectedProperty.capacity
                            }
                          >
                            <SelectTrigger id="children">
                              <SelectValue placeholder="Enfants" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                {
                                  length: Math.max(
                                    0,
                                    (selectedProperty?.capacity || 0) -
                                      adults +
                                      1
                                  ),
                                },
                                (_, i) => i
                              ).map((num) => (
                                <SelectItem
                                  key={`child-${num}`}
                                  value={String(num)}
                                >
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {selectedProperty && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Max: {selectedProperty.capacity} voyageurs
                            </p>
                          )}
                        </div>
                      </div>
                    </section>

                    {/* Comments Section */}
                    <section>
                      <Label
                        htmlFor="comments"
                        className="font-semibold text-lg mb-3 block"
                      >
                        Commentaires / Demandes spéciales
                      </Label>
                      <Textarea
                        id="comments"
                        value={comments}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setComments(e.target.value)
                        }
                        placeholder="Allergies, heure d'arrivée approximative, etc."
                      />
                    </section>
                  </div>
                </div>
              </ScrollArea>

              {/* Footer */}
              <DialogFooter className="mt-auto pt-4 px-6 pb-4 border-t">
                {/* Utiliser closeAndResetAll pour le bouton Annuler */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeAndResetAll}
                >
                  Annuler
                </Button>
                <Button
                  type="button"
                  onClick={confirmBooking}
                  disabled={
                    !startDate ||
                    !endDate ||
                    totalPrice <= 0 ||
                    !selectedProperty ||
                    adults + children > selectedProperty.capacity ||
                    adults + children === 0
                  }
                  size="lg"
                >
                  Confirmer ({totalPrice > 0 ? `${totalPrice}€` : "..."})
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* --- Lightbox Component --- */}
      <Lightbox
        // Utiliser le handler dédié pour la fermeture
        open={lightboxOpen}
        close={handleLightboxClose} // Important !
        slides={lightboxSlides}
        index={lightboxIndex}
        on={{
          view: ({ index: currentIndex }) => setLightboxIndex(currentIndex),
        }}
        // Plugins
        plugins={[Thumbnails, Zoom]} // Navigation is implicit via styles.css
        // Controller options
        controller={{ closeOnBackdropClick: false }} // Prevent closing on backdrop click
        // Optional configurations
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        thumbnails={{ position: "bottom" }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, .9)" },
          thumbnailsContainer: { backgroundColor: "rgba(0,0,0,.7)" },
        }}
      />
      {/* --- End of Lightbox --- */}
    </div>
  );
};

export default PropertyList;
