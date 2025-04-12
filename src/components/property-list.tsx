// src/components/property-list.tsx

"use client";

import React, { useState, useCallback } from "react"; // Ajout useCallback
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
    imageUrls: [
      "/images/knokke_1.jpg",
      "/images/knokke_2.jpg",
      "/images/knokke_3.jpg",
    ],
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
    imageUrls: [
      "/images/gand_1.jpg",
      "/images/gand_2.jpg",
      "/images/gand_3.jpg",
    ],
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
    imageUrls: ["/images/anvers_1.jpg", "/images/anvers_2.jpg"],
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
    imageUrls: ["/images/liege_1.jpg", "/images/liege_2.jpg"],
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
    setIsBookingModalOpen(true); // Ouvre la modale
    setLightboxOpen(false); // Assure que le lightbox est fermé quand on sélectionne une nouvelle propriété
  };

  // Fonction de réinitialisation/fermeture PROPRE de la MODALE et du FORMULAIRE
  const closeAndResetModal = useCallback(() => {
    console.log("Executing closeAndResetModal");
    setIsBookingModalOpen(false);
    // On ne touche PAS à setLightboxOpen ici, car il pourrait être fermé séparément
    // Réinitialiser les états liés à la modale et au formulaire
    // Utilisation d'un léger délai pour potentiellement aider avec les transitions CSS/JS de la modale
    setTimeout(() => {
      console.log("Resetting modal state inside timeout");
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
    }, 50); // 50ms delay
  }, []); // Pas de dépendances externes, les setters useState sont stables

  // NOUVELLE logique pour onOpenChange de la Dialog
  const handleModalOpenChange = useCallback(
    (open: boolean) => {
      console.log(
        `handleModalOpenChange called with: ${open}, current lightboxOpen state: ${lightboxOpen}`
      );
      if (!open) {
        // Une action tente de fermer la modale (clic extérieur, Echap, bouton Annuler via onOpenChange)
        if (!lightboxOpen) {
          // Si le lightbox n'est PAS ouvert, on peut fermer la modale et reset
          console.log("Modal closing allowed (lightbox was not open)");
          closeAndResetModal();
        } else {
          // Si le lightbox EST ouvert, NE PAS fermer la modale.
          // L'utilisateur doit fermer le lightbox d'abord (via son propre bouton/mécanisme).
          console.log(
            "Modal close prevented by onOpenChange (lightbox is open)"
          );
          // Normalement, on ne fait rien ici, la modale reste ouverte.
          // onInteractOutside devrait avoir empêché cela si le clic était DANS le lightbox.
        }
      } else {
        // Ouvre la modale (généralement suite à handlePropertyClick qui set isBookingModalOpen à true)
        console.log("Modal opening intent received by onOpenChange");
        // Assure que la modale est bien ouverte (redondant si déjà géré par handlePropertyClick mais sans danger)
        setIsBookingModalOpen(true);
      }
    },
    [lightboxOpen, closeAndResetModal]
  ); // Dépend de l'état actuel du lightbox et de la fonction de fermeture

  // Handler pour ouvrir le lightbox (inchangé)
  const openLightbox = (index: number) => {
    console.log(`Opening lightbox at index: ${index}`);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Handler pour fermer le lightbox (NE DOIT PAS FERMER LA MODALE)
  const handleLightboxClose = useCallback(() => {
    console.log("Closing lightbox ONLY via handleLightboxClose");
    setLightboxOpen(false);
    // Important: On ne touche PAS à isBookingModalOpen ici. La modale reste ouverte.
  }, []); // Pas de dépendances

  // Handler pour empêcher la fermeture de la modale lors d'une interaction DANS le lightbox
  const handleModalInteractOutside = useCallback((event: Event) => {
    const targetElement = event.target as Element;
    const isInsideLightbox = targetElement?.closest?.(".yarl__root");

    if (isInsideLightbox) {
      console.log(
        "InteractOutside prevented (click detected inside .yarl__root)"
      );
      // === ON CONSERVE CECI ===
      event.preventDefault(); // Empêche la Dialog de traiter cela comme un clic extérieur et de se fermer

      // === ON SUPPRIME CECI ===
      // event.stopPropagation(); // NE PAS arrêter la propagation, pour que les boutons du lightbox fonctionnent
      // =========================
    } else {
      console.log(
        "InteractOutside allowed (click was outside modal content and outside .yarl__root)"
      );
      // Laisse Radix UI/Shadcn gérer la fermeture via onOpenChange(false)
    }
  }, []); // Pas de dépendances

  const confirmBooking = () => {
    if (
      !selectedProperty ||
      !startDate ||
      !endDate ||
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !postalCode ||
      !country
    ) {
      toast({
        title: "Erreur de formulaire!",
        description: "Veuillez remplir tous les champs obligatoires (*).",
        variant: "destructive",
      });
      return;
    }
    if (adults + children <= 0) {
      toast({
        title: "Erreur de formulaire!",
        description: "Veuillez sélectionner au moins un voyageur.",
        variant: "destructive",
      });
      return;
    }
    if (adults + children > (selectedProperty?.capacity ?? 0)) {
      toast({
        title: "Erreur!",
        description: `Le nombre de voyageurs (${
          adults + children
        }) dépasse la capacité maximale (${selectedProperty?.capacity}).`,
        variant: "destructive",
      });
      return;
    }

    // Simulation réussie
    console.log("Booking Data:", {
      propertyId: selectedProperty.id,
      propertyName: selectedProperty.name,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      numberOfNights: numberOfDays,
      totalPrice: totalPrice,
      name,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      adults,
      children,
      comments,
    });
    toast({
      title: "Réservation Simulée!",
      description: `Votre demande pour ${selectedProperty.name} du ${format(
        startDate,
        "dd/MM/yyyy"
      )} au ${format(endDate, "dd/MM/yyyy")} a été enregistrée.`,
    });
    closeAndResetModal(); // Fermer et réinitialiser la modale après succès
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
  // Préparer les slides pour le lightbox (ne change pas souvent, mais recalculé si selectedProperty change)
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
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {dummyProperties.map((property) => (
          <motion.div key={property.id} variants={cardVariants}>
            <PropertyCard
              property={property}
              onSelectProperty={handlePropertyClick} // Ouvre la modale lors du clic
            />
          </motion.div>
        ))}
      </motion.div>
      {/* --- Fin Property Grid Animée --- */}
      {/* --- Booking Modal --- */}
      {/* On contrôle l'ouverture/fermeture via l'état et onOpenChange */}
      <Dialog open={isBookingModalOpen} onOpenChange={handleModalOpenChange}>
        {/* Pas besoin de DialogTrigger car l'ouverture est gérée par handlePropertyClick */}
        <DialogContent
          className="sm:max-w-6xl w-full max-h-[95vh]"
          onInteractOutside={handleModalInteractOutside} // Empêche la fermeture si on clique DANS le lightbox
          // onEscapeKeyDown={(e) => { // Optionnel : Gestion fine de la touche Echap
          //   if (lightboxOpen) {
          //       console.log("Escape key pressed while lightbox open, closing lightbox.");
          //       e.preventDefault(); // Empêche la Dialog de gérer Echap
          //       handleLightboxClose(); // Fermer d'abord le lightbox
          //   } else {
          //       console.log("Escape key pressed while lightbox closed, allowing modal close.");
          //       // Laisser la Dialog gérer Echap (ce qui appellera onOpenChange(false))
          //   }
          // }}
        >
          {/* On affiche le contenu seulement si une propriété est sélectionnée */}
          {selectedProperty && (
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
              {/* Zone scrollable pour le contenu principal */}
              <ScrollArea className="max-h-[calc(95vh-180px)] h-auto px-6 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Colonne Images */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold text-lg mb-2 sticky top-0 bg-background py-2 z-10">
                      Photos
                    </h3>
                    {/* Mapping des images pour affichage et clic pour Lightbox */}
                    {selectedProperty.imageUrls?.map((url, index) => (
                      <motion.div
                        key={url + index}
                        className="relative aspect-video rounded-lg overflow-hidden shadow-md border border-border/50 cursor-pointer group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        onClick={() => openLightbox(index)} // Ouvre le lightbox à l'index cliqué
                      >
                        <Image
                          src={url}
                          alt={`${selectedProperty.name} - Image ${index + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                          className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
                          sizes="(max-width: 1200px) 40vw, 500px"
                          loading={index === 0 ? "eager" : "lazy"} // Première image chargée en priorité
                          onError={(e) => {
                            // Fallback si image manquante
                            e.currentTarget.src = "/images/placeholder.jpg";
                          }}
                        />
                        {/* Indicateur visuel pour l'ouverture du lightbox */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
                  {/* Colonne Infos & Formulaire */}
                  <div className="lg:col-span-3 space-y-8">
                    {/* Section Description & Équipements */}
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

                    {/* Section Détails (Capacité, Chambres, Sdb) */}
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

                    {/* Section Sélection des Dates */}
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
                            setStartDate(range?.from);
                            setEndDate(range?.to);
                          }}
                          numberOfMonths={1} // Afficher 1 mois à la fois
                          disabled={{
                            before: new Date(
                              new Date().setDate(new Date().getDate())
                            ),
                          }} // Désactiver dates passées
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

                    {/* Section Informations Personnelles */}
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
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Téléphone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Adresse *</Label>
                          <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">Ville *</Label>
                          <Input
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>
                        <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="postalCode">Code Postal *</Label>
                            <Input
                              id="postalCode"
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="country">Pays *</Label>
                            <Input
                              id="country"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section Sélection des Voyageurs */}
                    <section>
                      <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                        Voyageurs *
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="adults">Adultes</Label>
                          <Select
                            value={String(adults)}
                            onValueChange={(value) => {
                              const newAdults = Number(value);
                              if (
                                selectedProperty &&
                                newAdults + children > selectedProperty.capacity
                              ) {
                                // Si dépasse capacité, réduire les enfants
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
                              {/* Générer options de 1 à capacité max */}
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
                            onValueChange={(value) =>
                              setChildren(Number(value))
                            }
                            // Désactiver si capacité max atteinte par les adultes
                            disabled={
                              !selectedProperty ||
                              adults >= selectedProperty.capacity
                            }
                          >
                            <SelectTrigger id="children">
                              <SelectValue placeholder="Enfants" />
                            </SelectTrigger>
                            <SelectContent>
                              {/* Générer options de 0 à capacité restante */}
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
                              Max: {selectedProperty.capacity} voyageurs au
                              total
                            </p>
                          )}
                        </div>
                      </div>
                    </section>

                    {/* Section Commentaires */}
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
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Allergies, heure d'arrivée approximative, besoin spécifique..."
                      />
                    </section>
                  </div>{" "}
                  {/* Fin Colonne Infos & Formulaire */}
                </div>{" "}
                {/* Fin Grid intérieur */}
              </ScrollArea>{" "}
              {/* Fin ScrollArea */}
              {/* Footer de la Modale */}
              <DialogFooter className="mt-auto pt-4 px-6 pb-4 border-t">
                {/* Bouton Annuler utilise la nouvelle fonction de fermeture */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeAndResetModal}
                >
                  Annuler
                </Button>
                {/* Bouton Confirmer */}
                <Button
                  type="button"
                  onClick={confirmBooking}
                  disabled={
                    // Conditions de désactivation
                    !startDate ||
                    !endDate ||
                    totalPrice <= 0 ||
                    !selectedProperty ||
                    !name ||
                    !email ||
                    !phone ||
                    !address ||
                    !city ||
                    !postalCode ||
                    !country || // Champs requis
                    adults + children <= 0 || // Au moins un voyageur
                    adults + children > selectedProperty.capacity // Ne pas dépasser la capacité
                  }
                  size="lg"
                >
                  Confirmer la réservation{" "}
                  {totalPrice > 0 ? `(${totalPrice}€)` : ""}
                </Button>
              </DialogFooter>
            </>
          )}{" "}
          {/* Fin condition selectedProperty */}
        </DialogContent>
      </Dialog>{" "}
      {/* Fin Dialog */}
      {/* --- Composant Lightbox --- */}
      {/* Rendu conditionnel basé sur l'état lightboxOpen */}
      <Lightbox
        open={lightboxOpen}
        close={handleLightboxClose}
        slides={lightboxSlides}
        index={lightboxIndex}
        on={{
          view: ({ index: currentIndex }) => setLightboxIndex(currentIndex),
        }}
        plugins={[Thumbnails, Zoom]}
        controller={{ closeOnBackdropClick: false }}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        thumbnails={{
          position: "bottom",
          border: 0,
          gap: 8,
          imageFit: "cover",
          vignette: false,
        }}
        styles={{
          // Assure-toi que cette ligne est bien présente et correcte
          container: { backgroundColor: "rgba(0, 0, 0, .90)" }, // 0.90 = 90% opaque

          // --- ATTENTION : Ne pas mettre de background sur thumbnailsContainer ici ---
          // thumbnailsContainer: { backgroundColor: "rgba(20, 20, 20, .8)" }, // <-- SUPPRIMER ou COMMENTER CETTE LIGNE

          thumbnail: {
            opacity: 0.7,
            transition: "opacity 0.2s",
            borderColor: "transparent",
            borderWidth: "2px",
            borderStyle: "solid",
          },
          // PAS de thumbnailActive ici
        }}
      />
      {/* --- Fin Lightbox --- */}
    </div>
  );
};

export default PropertyList;
