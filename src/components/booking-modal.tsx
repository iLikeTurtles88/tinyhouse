// src/components/booking-modal.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react"; // Ajout useRef
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

// --- Interface Property (Peut être déplacée dans src/types/index.ts) ---
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

// --- Props Interface for BookingModal ---
interface BookingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void; // Fonction pour fermer la modale depuis le parent
  // onSubmitBooking?: (bookingData: any) => void; // Optionnel: Pour gérer la soumission réelle plus tard
}

// --- Booking Modal Component ---
export const BookingModal: React.FC<BookingModalProps> = ({
  property,
  isOpen,
  onClose,
  // onSubmitBooking,
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
  // --- Référence pour DialogContent (pour le fix de transparence) ---
  const contentRef = useRef<HTMLDivElement>(null);
  // --- End of State ---

  // --- Media Query Hook ---
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const calendarNumberOfMonths = isDesktop ? 2 : 1;
  // --- End Media Query ---

  // --- Effect to reset form when modal opens or property changes ---
  useEffect(() => {
    if (isOpen && property) {
      // Reset form fields
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
      // Force un reflow en lisant offsetHeight.
      // Le setTimeout (même 0 ou 50ms) permet au navigateur de potentiellement
      // terminer le cycle de rendu CSS initial avant de forcer le recalcul.
      const timerId = setTimeout(() => {
        if (contentRef.current) {
          // La simple lecture de offsetHeight suffit à déclencher le reflow
          console.log("Forcing reflow:", contentRef.current.offsetHeight);
        }
      }, 50); // Un délai court (50ms) est souvent suffisant

      return () => clearTimeout(timerId); // Nettoyage du timer
    }
  }, [isOpen]); // Se déclenche quand isOpen devient true
  // --- Fin Effect Reflow ---

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
  // --- End of Calculations ---

  // --- Event Handlers ---

  // Ouvrir Lightbox
  const openLightbox = (index: number) => {
    console.log(`Opening lightbox at index: ${index}`);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Fermer Lightbox SEULEMENT
  const handleLightboxClose = useCallback(() => {
    console.log("Closing lightbox ONLY via handleLightboxClose");
    setLightboxOpen(false);
  }, []);

  // Fonction interne pour gérer la fermeture propre et appeler onClose du parent
  const handleCloseAndReset = useCallback(() => {
    console.log("Executing handleCloseAndReset (calling parent onClose)");
    setLightboxOpen(false); // Assure que le lightbox est marqué fermé
    // Les états du formulaire seront réinitialisés par useEffect lors de la prochaine ouverture
    onClose(); // Appelle la fonction onClose fournie par PropertyList
  }, [onClose]);

  // Gérer onOpenChange de la Dialog pour l'interaction complexe avec le Lightbox
  const handleModalOpenChange = useCallback(
    (open: boolean) => {
      console.log(
        `Modal's internal handleModalOpenChange called with: ${open}, lightboxOpen: ${lightboxOpen}`
      );
      if (!open) {
        // Intent de fermeture (clic extérieur, Echap)
        if (!lightboxOpen) {
          console.log("Modal closing allowed by handleModalOpenChange.");
          handleCloseAndReset(); // Ferme la modale via le parent
        } else {
          console.log(
            "Modal closing PREVENTED by handleModalOpenChange (lightbox open)."
          );
          // Ne fait rien, la modale reste ouverte
        }
      }
      // Si open est true, la modale s'ouvre (géré par le parent via la prop `isOpen`)
    },
    [lightboxOpen, handleCloseAndReset]
  );

  // Empêcher la fermeture si clic DANS le Lightbox
  const handleModalInteractOutside = useCallback((event: Event) => {
    const targetElement = event.target as Element;
    // Vérifie si le clic vient de l'intérieur d'un élément du lightbox
    const isInsideLightbox = targetElement?.closest?.(".yarl__root");

    if (isInsideLightbox) {
      console.log(
        "InteractOutside prevented (click detected inside .yarl__root)"
      );
      event.preventDefault(); // Empêche Radix de fermer la Dialog
    } else {
      console.log("InteractOutside allowed (outside lightbox).");
      // Laisse Radix gérer (appellera onOpenChange(false))
    }
  }, []);

  // Confirmation de réservation (Simulation)
  const confirmBooking = useCallback(() => {
    // Validation des champs requis
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

    // Préparation des données (pour console log ou futur appel API)
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

    // --- SIMULATION ---
    // Ici, on appellerait onSubmitBooking(bookingData) si fourni par le parent
    // et on gérerait les états de chargement/erreur

    toast({
      title: "Réservation Simulée!",
      description: `Votre demande pour ${property.name} du ${format(
        startDate,
        "PPP",
        { locale: fr }
      )} au ${format(endDate, "PPP", { locale: fr })} a été enregistrée.`,
    });

    // Ferme la modale après la "réservation"
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
    handleCloseAndReset, // Utiliser la fonction de fermeture interne
  ]);
  // --- Fin Event Handlers ---

  // Ne rien rendre si la modale n'est pas ouverte ou si la propriété n'est pas chargée
  // (Bien que le rendu conditionnel du contenu soit géré à l'intérieur,
  // cela évite de rendre la structure Dialog/Lightbox inutilement si isOpen est false)
  if (!isOpen) {
    return null;
  }

  // Rendu JSX de la modale
  return (
    <>
      {/* Dialog de Shadcn/UI contrôlée par l'état isOpen du parent */}
      <Dialog open={isOpen} onOpenChange={handleModalOpenChange}>
        {/* Appliquer la ref ici pour le fix de transparence */}
        <DialogContent
          ref={contentRef}
          className="sm:max-w-6xl w-full max-h-[95vh]"
          onInteractOutside={handleModalInteractOutside} // Gérer clic extérieur vs lightbox
          onEscapeKeyDown={(e) => {
            // Gestion fine de la touche Echap
            if (lightboxOpen) {
              console.log(
                "Escape key pressed while lightbox open, closing lightbox."
              );
              e.preventDefault(); // Empêche Dialog de gérer Echap pour l'instant
              handleLightboxClose(); // Ferme d'abord le lightbox
            } else {
              console.log(
                "Escape key pressed while lightbox closed, allowing modal close via onOpenChange."
              );
              // Laisser Dialog gérer Echap (appellera onOpenChange(false))
            }
          }}
        >
          {/* Affiche le contenu seulement si une propriété est sélectionnée */}
          {property && (
            <>
              <DialogHeader className="pr-6 pb-0">
                <DialogTitle className="text-2xl font-semibold">
                  {property.name}
                </DialogTitle>
                <DialogDescription className="flex items-center text-base pt-1">
                  <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-muted-foreground" />
                  {property.location} - {property.price}€ / nuit
                </DialogDescription>
              </DialogHeader>
              {/* Zone scrollable pour le contenu principal */}
              <ScrollArea className="max-h-[calc(95vh-180px)] h-auto px-6 pt-4">
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
                        onClick={() => openLightbox(index)} // Ouvre le lightbox interne
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

                    {/* Détails (Capacité, Chambres, Sdb) */}
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

                    {/* Sélection des Dates */}
                    <section>
                      <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                        Sélectionnez vos dates *
                      </h3>
                      <div className="w-full flex justify-center md:justify-start">
                        <Calendar
                          mode="range"
                          defaultMonth={startDate ?? new Date()}
                          selected={{ from: startDate, to: endDate }}
                          onSelect={(range: DateRange | undefined) => {
                            setStartDate(range?.from);
                            setEndDate(range?.to);
                          }}
                          numberOfMonths={calendarNumberOfMonths} // Utilise la variable dynamique
                          disabled={{
                            before: new Date(
                              new Date().setDate(new Date().getDate())
                            ),
                          }} // Désactive jours passés
                          className="rounded-md border p-3 shadow-sm w-auto inline-block" // w-auto important
                          pagedNavigation
                          showOutsideDays
                        />
                      </div>
                      {/* Affichage Dates / Prix */}
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

                    {/* Sélection des Voyageurs */}
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
              {/* Footer de la Modale */}
              <DialogFooter className="mt-auto pt-4 px-6 pb-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseAndReset}
                >
                  Annuler
                </Button>
                <Button
                  type="button"
                  onClick={confirmBooking} // Appelle la fonction de confirmation interne
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
      </Dialog>{" "}
      {/* Fin Dialog */}
      {/* --- Composant Lightbox (reste dans la modale) --- */}
      <Lightbox
        open={lightboxOpen}
        close={handleLightboxClose} // Utilise le handler spécifique pour fermer SEULEMENT le lightbox
        slides={lightboxSlides}
        index={lightboxIndex}
        on={{
          view: ({ index: currentIndex }) => setLightboxIndex(currentIndex),
        }}
        plugins={[Thumbnails, Zoom]}
        controller={{ closeOnBackdropClick: false }} // Empêche fermeture via clic sur backdrop LB
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        thumbnails={{
          position: "bottom",
          border: 0,
          gap: 8,
          imageFit: "cover",
          vignette: false,
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, .90)" }, // Fond opaque
          thumbnail: {
            opacity: 0.7,
            transition: "opacity 0.2s",
            borderColor: "transparent",
            borderWidth: "2px",
            borderStyle: "solid",
          },
          // NOTE: La miniature active est stylée via globals.css (.yarl__thumbnail--active)
        }}
      />
      {/* --- Fin Lightbox --- */}
    </>
  );
};

// Non nécessaire si export nommé direct
// export default BookingModal;
