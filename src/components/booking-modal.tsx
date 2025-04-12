// src/components/booking-modal.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area"; // <-- Keep this import
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Bed, Bath, Users, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AmenityItem } from "@/lib/amenity-icons";
import { motion } from "framer-motion";
import type { DateRange } from "react-day-picker";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import useMediaQuery from "@/hooks/use-media-query";

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

// --- Props Interface ---
interface BookingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

// --- Booking Modal Component ---
export const BookingModal: React.FC<BookingModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  // --- State ---
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // --- Media Query Hook ---
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const calendarNumberOfMonths = isDesktop ? 2 : 1;

  // --- Effect to reset form ---
  useEffect(() => {
    if (isOpen && property) {
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
      setLightboxOpen(false);
    }
  }, [isOpen, property]);

  // --- Effect pour forcer le reflow (fix transparence initiale) ---
  useEffect(() => {
    if (isOpen && contentRef.current) {
      const timerId = setTimeout(() => {
        if (contentRef.current) {
          console.log("Forcing reflow:", contentRef.current.offsetHeight);
        }
      }, 50);
      return () => clearTimeout(timerId);
    }
  }, [isOpen]);

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
  const totalPrice = numberOfDays * (property?.price || 0);
  const lightboxSlides = property?.imageUrls.map((url) => ({ src: url })) || [];

  // --- Event Handlers ---
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);
  const handleCloseAndReset = useCallback(() => {
    setLightboxOpen(false);
    onClose();
  }, [onClose]);
  const handleModalOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        if (!lightboxOpen) {
          handleCloseAndReset();
        }
      }
    },
    [lightboxOpen, handleCloseAndReset]
  );
  const handleModalInteractOutside = useCallback((event: Event) => {
    if ((event.target as Element)?.closest?.(".yarl__root")) {
      event.preventDefault();
    }
  }, []);
  const confirmBooking = useCallback(() => {
    if (
      !property ||
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
        variant: "destructive",
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires (*).",
      });
      return;
    }
    if (adults + children <= 0) {
      toast({
        variant: "destructive",
        title: "Aucun voyageur",
        description: "Veuillez indiquer au moins un voyageur.",
      });
      return;
    }
    if (adults + children > (property?.capacity ?? 0)) {
      toast({
        variant: "destructive",
        title: "Capacité dépassée",
        description: `Le nombre total de voyageurs (${
          adults + children
        }) dépasse la capacité maximale (${property.capacity}).`,
      });
      return;
    }
    const bookingData = {
      propertyId: property.id,
      propertyName: property.name,
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
    };
    console.log("Booking Data (Simulation):", bookingData);
    toast({
      title: "Réservation Simulée!",
      description: `Votre demande pour ${property.name} du ${format(
        startDate,
        "PPP",
        { locale: fr }
      )} au ${format(endDate, "PPP", { locale: fr })} a été enregistrée.`,
    });
    handleCloseAndReset();
  }, [
    property,
    startDate,
    endDate,
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
    numberOfDays,
    totalPrice,
    handleCloseAndReset,
  ]);

  if (!isOpen) {
    return null;
  }

  // --- Rendu JSX ---
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleModalOpenChange}>
        {/* ===== CORRECTION START ===== */}
        <DialogContent
          ref={contentRef}
          // AJOUT: flex flex-col pour gérer la hauteur
          // AJOUT: p-0 car le padding sera géré par les enfants (Header, ScrollArea, Footer)
          className="sm:max-w-6xl w-full max-h-[95vh] flex flex-col p-0"
          onInteractOutside={handleModalInteractOutside}
          onEscapeKeyDown={(e) => {
            if (lightboxOpen) {
              e.preventDefault();
              handleLightboxClose();
            }
          }}
        >
          {/* Condition pour afficher le contenu */}
          {property && (
            <>
              {/* AJOUT: Padding et bordure inférieure */}
              <DialogHeader className="px-6 pt-6 pb-4 border-b">
                <DialogTitle className="text-2xl font-semibold">
                  {property.name}
                </DialogTitle>
                <DialogDescription className="flex items-center text-base pt-1">
                  <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-muted-foreground" />
                  {property.location} - {property.price}€ / nuit
                </DialogDescription>
              </DialogHeader>
              {/* AJOUT: flex-1 pour prendre l'espace, overflow-y-auto pour scroller */}
              {/* AJOUT: Padding pour le contenu scrollable */}
              {/* SUPPRESSION: max-h-[calc(95vh-180px)] h-auto */}
              <ScrollArea className="flex-1 overflow-y-auto px-6 pt-4 pb-4">
                {" "}
                {/* Ajout pb-4 pour espacement avant footer */}
                {/* Le contenu scrollable reste ici */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* --- Colonne Images --- */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold text-lg mb-2 sticky top-0 bg-background py-2 z-10">
                      Photos
                    </h3>
                    {property.imageUrls?.map((url, index) => (
                      <motion.div
                        key={url + index}
                        className="relative aspect-video rounded-lg overflow-hidden shadow-md border border-border/50 cursor-pointer group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={url}
                          alt={`${property.name} - Image ${index + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                          className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
                          sizes="(max-width: 1200px) 40vw, 500px"
                          loading={index === 0 ? "eager" : "lazy"}
                          onError={(e) => {
                            e.currentTarget.src = "/images/placeholder.jpg";
                          }}
                        />
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
                    {(!property.imageUrls ||
                      property.imageUrls.length === 0) && (
                      <p className="text-muted-foreground">
                        Pas d'images disponibles.
                      </p>
                    )}
                  </div>
                  {/* --- Colonne Infos & Formulaire --- */}
                  <div className="lg:col-span-3 space-y-8">
                    {/* Description & Équipements */}
                    <section>
                      <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                        Description
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {property.description}
                      </p>
                      <h4 className="font-semibold text-md mb-3">
                        Équipements principaux
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                        {property.amenities.map((amenity) => (
                          <AmenityItem key={amenity} amenity={amenity} />
                        ))}
                      </div>
                    </section>
                    {/* Détails */}
                    <section>
                      <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                        Détails
                      </h3>
                      <div className="flex items-center justify-start space-x-6 text-base">
                        <div
                          className="flex items-center text-foreground"
                          title={`Capacité: ${property.capacity} personne(s)`}
                        >
                          <Users className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                          <span>{property.capacity} pers. max</span>
                        </div>
                        <div
                          className="flex items-center text-foreground"
                          title={`${property.bedrooms} Chambre(s)`}
                        >
                          <Bed className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                          <span>{property.bedrooms} ch.</span>
                        </div>
                        <div
                          className="flex items-center text-foreground"
                          title={`${property.bathrooms} Salle(s) de bain`}
                        >
                          <Bath className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                          <span>{property.bathrooms} sdb.</span>
                        </div>
                      </div>
                    </section>
                    {/* Sélection Dates */}
                    <section>
                      <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                        Sélectionnez vos dates *
                      </h3>
                      <div className="w-full flex justify-center md:justify-start">
                        <Calendar
                          mode="range"
                          defaultMonth={startDate ?? new Date()}
                          selected={{ from: startDate, to: endDate }}
                          onSelect={(range) => {
                            setStartDate(range?.from);
                            setEndDate(range?.to);
                          }}
                          numberOfMonths={calendarNumberOfMonths}
                          disabled={{
                            before: new Date(
                              new Date().setDate(new Date().getDate())
                            ),
                          }}
                          className="rounded-md border p-3 shadow-sm w-auto inline-block"
                          pagedNavigation
                          showOutsideDays
                        />
                      </div>
                      <div className="text-center mt-4 space-y-1">
                        {startDate && endDate ? (
                          <>
                            <p>
                              Séjour du{" "}
                              <span className="font-semibold">
                                {format(startDate, "PPP", { locale: fr })}
                              </span>{" "}
                              au{" "}
                              <span className="font-semibold">
                                {format(endDate, "PPP", { locale: fr })}
                              </span>
                            </p>
                            <p className="text-lg font-semibold text-primary">
                              {numberOfDays} nuit{numberOfDays > 1 ? "s" : ""} -{" "}
                              {totalPrice} €
                            </p>
                          </>
                        ) : (
                          <p className="text-muted-foreground">
                            Sélectionnez une date de début et de fin.
                          </p>
                        )}
                      </div>
                    </section>
                    {/* Informations Personnelles */}
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
                    {/* Sélection Voyageurs */}
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
                                property &&
                                newAdults + children > property.capacity
                              ) {
                                setChildren(
                                  Math.max(0, property.capacity - newAdults)
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
                                { length: property?.capacity || 1 },
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
                            disabled={!property || adults >= property.capacity}
                          >
                            <SelectTrigger id="children">
                              <SelectValue placeholder="Enfants" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                {
                                  length: Math.max(
                                    0,
                                    (property?.capacity || 0) - adults + 1
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
                          {property && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Max: {property.capacity} voyageurs
                            </p>
                          )}
                        </div>
                      </div>
                    </section>
                    {/* Commentaires */}
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
                        placeholder="Allergies, heure d'arrivée approx., besoin spécifique..."
                      />
                    </section>
                  </div>{" "}
                  {/* Fin Colonne Infos & Formulaire */}
                </div>{" "}
                {/* Fin Grid intérieur */}
              </ScrollArea>{" "}
              {/* Fin ScrollArea */}
              {/* AJOUT: Padding et bordure supérieure */}
              <DialogFooter className="px-6 pt-4 pb-4 border-t">
                {" "}
                {/* mt-auto supprimé car flex gère */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseAndReset}
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
                    !property ||
                    !name ||
                    !email ||
                    !phone ||
                    !address ||
                    !city ||
                    !postalCode ||
                    !country ||
                    adults + children <= 0 ||
                    adults + children > property.capacity
                  }
                  size="lg"
                >
                  Confirmer la réservation{" "}
                  {totalPrice > 0 ? `(${totalPrice}€)` : ""}
                </Button>
              </DialogFooter>
            </>
          )}{" "}
          {/* Fin condition property */}
        </DialogContent>
        {/* ===== CORRECTION END ===== */}
      </Dialog>

      {/* --- Composant Lightbox --- */}
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
          container: { backgroundColor: "rgba(0, 0, 0, .90)" },
          thumbnail: {
            opacity: 0.7,
            transition: "opacity 0.2s",
            borderColor: "transparent",
            borderWidth: "2px",
            borderStyle: "solid",
          },
        }}
      />
    </>
  );
};
