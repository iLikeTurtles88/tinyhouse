// src/lib/amenity-icons.tsx
import {
  Wifi,
  Utensils, // Remplacé Kitchenette par Utensils
  Heater,
  Snowflake,
  Waves,
  ParkingCircle,
  PawPrint,
  MountainSnow,
  TreePine,
  Wind,
  Sun,
  Ship,
  Tv,
  Bath,
  Bed,
  Coffee,
  Flame, // Remplacé Grill par Flame (ou CookingPot si tu préfères)
  Users,
  Check,
  Star,
  MapPin,
  Home,
  ShowerHead,
  Bike,
  PlugZap,
  Sofa,
  Warehouse,
  Leaf,
  Droplets, // Remplacé Water par Droplets
  CookingPot, // Ajouté comme alternative pour Grill/Cuisine
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils"; // <--- AJOUTER CET IMPORT

// Type pour une icône Lucide (simplifié)
type LucideIcon = React.ComponentType<React.ComponentProps<"svg">>;

// Mapping des noms d'équipements (en minuscules, sans accents) vers les icônes
export const amenityIcons: Record<string, LucideIcon> = {
  wifi: Wifi,
  kitchenette: Utensils, // <--- Changé ici
  cuisine: Utensils,
  poeleabois: Flame,
  cheminee: Flame,
  chauffage: Heater,
  climatisation: Snowflake,
  terrasse: Sun,
  jardin: Leaf,
  nature: TreePine,
  procheplage: Waves,
  accesplage: Waves,
  parking: ParkingCircle,
  "animaux acceptes": PawPrint, // Note: j'ai enlevé l'accent pour simplifier la normalisation
  montagne: MountainSnow,
  vent: Wind,
  bateau: Ship,
  television: Tv,
  tv: Tv,
  baignoire: Bath,
  douche: ShowerHead,
  "salle de bain": Bath,
  chambre: Bed,
  cafe: Coffee,
  bbq: Flame, // <--- Changé ici (ou CookingPot)
  barbecue: Flame, // <--- Changé ici (ou CookingPot)
  invites: Users,
  jacuzzi: Snowflake,
  piscine: Waves,
  essentiel: Check,
  "vue degagee": Sun,
  "panneaux solaires": PlugZap,
  "toilettes seches": Leaf,
  "pret de velos": Bike,
  kayak: Ship,
  "terrasse sur l eau": Droplets, // <--- Changé ici
  quai: Ship,
  design: Star,
  container: Warehouse,
  canapelit: Sofa,
  // ... ajoute d'autres mappings ici
};

// Fonction pour obtenir une icône (avec fallback)
export const getAmenityIcon = (amenity: string): LucideIcon => {
  const normalizedAmenity = amenity
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlève accents
    .replace(/-/g, " "); // Remplace tirets par espaces si besoin
  return amenityIcons[normalizedAmenity] || Home;
};

// Composant pour afficher un équipement avec son icône
export const AmenityItem: React.FC<{ amenity: string; className?: string }> = ({
  amenity,
  className,
}) => {
  const Icon = getAmenityIcon(amenity);
  return (
    <div className={cn("flex items-center space-x-2 text-sm", className)}>
      <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      {/* Afficher le texte original avec majuscule */}
      <span className="text-muted-foreground">{amenity}</span>
    </div>
  );
};
