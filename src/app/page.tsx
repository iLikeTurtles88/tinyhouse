// src/app/page.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import PropertyList from "@/components/property-list"; // Assurez-vous que le chemin est correct
import ContactForm from "@/components/contact-form"; // Assurez-vous que le chemin est correct
import Image from "next/image";
import { motion } from "framer-motion";

// --- Imports pour les Particules ---
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadImageShape } from "@tsparticles/shape-image";
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
      fullScreen: { enable: false }, // Important: désactiver le plein écran
      fpsLimit: 60, // Limiter les FPS pour la performance
      interactivity: {
        events: {
          onClick: { enable: false },
          onHover: { enable: false },
        },
      },
      particles: {
        number: {
          value: 80, // Nombre de feuilles
          density: { enable: true, area: 800 },
        },
        shape: {
          type: "image", // Utiliser une image
          image: {
            src: "/images/leaf.png", // Chemin public correct
            width: 50, // Largeur de l'image leaf.png
            height: 50, // Hauteur de l'image leaf.png
          },
        },
        opacity: {
          value: { min: 0.4, max: 0.9 }, // Opacité variable
          animation: {
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
            enable: true,
            acceleration: 0.5, // Simulation de gravité
          },
          drift: {
            // Léger mouvement horizontal aléatoire
            min: -0.5,
            max: 0.5,
          },
          outModes: {
            // Faire disparaître les feuilles en bas
            default: "out",
            top: "destroy",
          },
          straight: false, // Mouvement non rectiligne
          random: true, // Direction de départ un peu aléatoire
        },
        rotate: {
          // Rotation aléatoire des feuilles
          value: { min: 0, max: 360 },
          direction: "random",
          animation: {
            enable: true,
            speed: { min: 5, max: 15 },
            sync: false,
          },
        },
      },
      detectRetina: true, // Meilleure qualité sur écrans Retina
    }),
    [] // Dépendances vides pour useMemo
  );
  // --- Fin Configuration Particules ---

  // Animation Framer Motion pour le texte
  const fadeInFromBottom = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  // Attendre que le moteur de particules soit prêt
  if (!init) {
    return null; // Ou afficher un composant de chargement si vous préférez
  }

  return (
    // Conteneur principal qui assure que le contenu prend au moins la hauteur de l'écran
    <div className={`flex flex-col min-h-screen`}>
      {/* Hero Section */}
      {/* Marge inférieure ajoutée pour augmenter l'espace après le Hero */}
      <section className="relative h-96 flex items-center justify-center text-center text-white bg-gray-800 overflow-hidden mb-20">
        {/* Image de fond */}
        <Image
          src="/images/entete.jpg"
          alt="En-tête Tiny House"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0 z-0 opacity-60"
          priority // Important pour le LCP (Largest Contentful Paint)
        />

        {/* Composant Particules */}
        <Particles
          id="tsparticles-leaves"
          options={particleOptions}
          className="absolute inset-0 z-10" // Positionné au-dessus de l'image, en dessous du texte
        />

        {/* Conteneur pour le texte animé (positionné au-dessus des particules) */}
        <div className="relative z-20 overflow-hidden px-4">
          <motion.h1
            // Taille du titre augmentée
            className="text-6xl font-bold mb-4" // Était text-5xl
            variants={fadeInFromBottom}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Tiny Houses
          </motion.h1>
          <motion.p
            // Taille du sous-titre augmentée
            className="text-2xl" // Était text-xl
            variants={fadeInFromBottom}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Découvrez la liberté et le confort de nos tiny houses uniques.
          </motion.p>
        </div>
      </section>

      {/* Property List Section */}
      {/* Ajout d'une marge inférieure pour espacer de la section Contact */}
      <section className="p-6 mb-12">
        <PropertyList />
      </section>

      {/* Contact Section */}
      {/* Padding vertical réduit */}
      <section className="bg-secondary px-6 pt-10 pb-6">
        {" "}
        {/* Padding vertical réduit */}
        {/* Texte informatif ajouté au-dessus du formulaire */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          {/* Titre de la section Contact */}
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Contactez-nous
          </h2>
          {/* Petit texte d'information */}
          <p className="text-sm text-muted-foreground">
            Une question sur une tiny house ? Envie de réserver ou simplement de
            discuter de votre projet ? Remplissez le formulaire ci-dessous et
            notre équipe vous répondra dans les plus brefs délais.
          </p>
        </div>
        {/* Composant Formulaire de Contact */}
        <ContactForm />
      </section>

      {/* Footer (qui était présent dans votre code original de page.tsx) */}
      {/* Si vous avez déplacé le Footer dans layout.tsx, vous pouvez supprimer cette section */}
      <footer className="text-center p-4 text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Tiny House Location. Tous droits
          réservés.
        </p>
        {/* Ajoutez ici les icônes sociales si le footer est géré ici */}
      </footer>
    </div>
  );
}
