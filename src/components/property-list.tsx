// src/components/property-list.tsx
"use client";

import React, { useState, useCallback } from "react";
import PropertyCard from "@/components/property-card";
import { BookingModal } from "@/components/booking-modal"; // <-- Import the new modal component
import { motion } from "framer-motion";
// Remove imports that were moved to BookingModal (Dialog, Calendar, Input, etc.)
// Keep imports needed here: useState, useCallback, PropertyCard, motion

// --- Interface Property (Can be moved to a types file later) ---
// Keep it here for PropertyCard prop type, or move to shared types file
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
  // --- State kept in PropertyList ---
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  // --- End of State Declarations ---

  // --- Event Handlers kept/adapted in PropertyList ---
  const handlePropertyClick = useCallback((property: Property) => {
    setSelectedProperty(property);
    setIsBookingModalOpen(true); // Just open the modal
  }, []);

  // Function to close the modal (passed as prop)
  const handleModalClose = useCallback(() => {
    setIsBookingModalOpen(false);
    // Delay setting property to null slightly to allow modal fade-out animation
    setTimeout(() => {
      setSelectedProperty(null);
    }, 300); // Adjust timing based on modal animation duration
  }, []);

  // Placeholder for handling the actual booking submission (if needed here)
  // const handleBookingSubmit = useCallback((bookingData: any) => {
  //   console.log("Booking submitted to PropertyList:", bookingData);
  //   // Potentially make API call here or handle global state update
  //   // The modal already shows a toast and closes itself via handleModalClose
  // }, [handleModalClose]);

  // --- Animation variants (kept here) ---
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  // --- Fin Variantes ---

  return (
    <div>
      {/* --- Property Grid Animée (Unchanged) --- */}
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
              onSelectProperty={handlePropertyClick} // Trigger modal opening
            />
          </motion.div>
        ))}
      </motion.div>
      {/* --- Fin Property Grid Animée --- */}

      {/* --- Render the Booking Modal Component --- */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleModalClose} // Pass the close handler
        property={selectedProperty}
        // onSubmitBooking={handleBookingSubmit} // Pass submit handler if needed
      />
      {/* --- End Booking Modal Component --- */}
    </div>
  );
};

export default PropertyList;
