// src/app/page.tsx

"use client";

import { useState, useEffect, useMemo, useCallback } from "react"; // Ajouter hooks
import PropertyList from "@/components/property-list";
import ContactForm from "@/components/contact-form";
import Image from "next/image";
import { motion } from "framer-motion";

// --- Imports pour les Particules ---
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadImageShape } from "@tsparticles/shape-image"; // Pour utiliser notre image de feuille
// --- Fin Imports Particules ---

export default function Home() {
  // --- State pour l'initialisation des particules ---
  const [init, setInit] = useState(false);

  // Initialiser le moteur une seule fois
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Charger la forme d'image (notre feuille)
      await loadImageShape(engine);
    }).then(() => {
      setInit(true); // Moteur prêt
    });
  }, []);
  // --- Fin Initialisation Particules ---

  // --- Configuration des particules (feuilles) ---
  const particleOptions: ISourceOptions = useMemo(
    () => ({
      // background: { // Pas besoin si on veut le voir par dessus l'image Hero
      //   color: { value: "#transparent" },
      // },
      fullScreen: { enable: false }, // Important: désactiver le plein écran
      fpsLimit: 60, // Limiter les FPS pour la performance
      interactivity: {
        // Pas d'interaction nécessaire ici
        events: {
          onClick: { enable: false },
          onHover: { enable: false },
        },
      },
      particles: {
        number: {
          value: 40, // Nombre de feuilles (ajuster selon besoin/performance)
          density: { enable: true, area: 800 },
        },
        shape: {
          type: "image", // Utiliser une image
          image: {
            src: "/images/leaf.png", // Chemin vers ton image de feuille
            width: 100, // Largeur de l'image originale
            height: 100, // Hauteur de l'image originale
          },
        },
        opacity: {
          value: { min: 0.4, max: 0.9 }, // Opacité variable
          animation: {
            // Faire varier l'opacité légèrement
            enable: true,
            speed: 0.5,
            minimumValue: 0.3,
            sync: false,
          },
        },
        size: {
          value: { min: 10, max: 25 }, // Taille variable des feuilles
        },
        move: {
          enable: true,
          direction: "bottom", // Direction générale vers le bas
          speed: { min: 1, max: 3 }, // Vitesse de chute variable
          gravity: {
            // Simuler la gravité
            enable: true,
            acceleration: 0.5, // Ajuster pour un effet plus ou moins rapide
          },
          drift: {
            // Léger mouvement horizontal aléatoire
            min: -0.5,
            max: 0.5,
          },
          outModes: {
            // Faire disparaître les feuilles en bas
            default: "out",
            top: "destroy", // Détruire si elles remontent (ne devrait pas arriver avec gravité)
          },
          straight: false, // Mouvement non rectiligne (plus naturel)
          random: true, // Direction de départ un peu aléatoire
          trail: {
            // Optionnel: petite traînée (peut affecter perf)
            // enable: true,
            // length: 3,
            // fill: { color: "#000000" } // Couleur de la traînée
          },
        },
        rotate: {
          // Rotation aléatoire des feuilles
          value: { min: 0, max: 360 },
          direction: "random",
          animation: {
            enable: true,
            speed: { min: 5, max: 15 }, // Vitesse de rotation variable
            sync: false,
          },
        },
      },
      detectRetina: true, // Meilleure qualité sur écrans Retina
    }),
    [] // Dépendances vides pour useMemo car les options ne changent pas
  );
  // --- Fin Configuration Particules ---

  // Animation Framer Motion pour le texte (pas de changement)
  const fadeInFromBottom = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  // --- Rendu du Composant ---
  if (!init) {
    // Si le moteur n'est pas prêt, ne pas rendre les particules
    return null; // Ou afficher un loader simple si besoin
  }

  return (
    <div className={`flex flex-col min-h-screen`}>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-center text-white bg-gray-800 overflow-hidden">
        {/* Image de fond (zIndex 0) */}
        <Image
          src="/images/entete.jpg"
          alt="En-tête Tiny House"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0 z-0 opacity-60" // Ajuster zIndex si besoin
          priority
        />

        {/* === AJOUT DES PARTICULES === */}
        <Particles
          id="tsparticles-leaves"
          options={particleOptions}
          className="absolute inset-0 z-10" // Positionné par-dessus l'image de fond (ajuster zIndex si besoin)
        />
        {/* =========================== */}

        {/* Conteneur pour le texte animé (zIndex supérieur aux particules) */}
        <div className="relative z-20 overflow-hidden px-4">
          {" "}
          {/* zIndex plus élevé */}
          <motion.h1
            className="text-5xl font-bold mb-4"
            variants={fadeInFromBottom}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Tiny Houses
          </motion.h1>
          <motion.p
            className="text-xl"
            variants={fadeInFromBottom}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Découvrez la liberté et le confort de nos tiny houses uniques.
          </motion.p>
        </div>
      </section>

      {/* Property List Section (pas de changement) */}
      <section className="p-6">
        <PropertyList />
      </section>

      {/* Contact Section (pas de changement) */}
      <section className="bg-secondary p-6 py-12">{/* ... */}</section>

      {/* Footer (pas de changement) */}
      <footer className="text-center p-4 text-muted-foreground">
        {/* ... */}
      </footer>
    </div>
  );
}
