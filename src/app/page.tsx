// src/app/page.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import PropertyList from "@/components/property-list"; // Assurez-vous que le chemin est correct
import ContactForm from "@/components/contact-form"; // Assurez-vous que le chemin est correct
import Image from "next/image";
import { motion } from "framer-motion";

// --- Imports pour les Particules ---
// Si tu as besoin de toutes les formes et interactions, utilise loadFull:
// import { loadFull } from "tsparticles";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
// Charger uniquement les modules nécessaires peut être plus léger:
import { loadImageShape } from "@tsparticles/shape-image";
import { loadBasic } from "@tsparticles/basic"; // Pour les mouvements de base, opacité etc. si loadFull n'est pas utilisé
// --- Fin Imports Particules ---

export default function Home() {
  // --- State pour l'initialisation des particules ---
  const [init, setInit] = useState(false);

  // Initialiser le moteur une seule fois
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // --- Choisis l'une des options suivantes pour charger les dépendances : ---

      // Option 1: Charger uniquement ce qui est utilisé (plus léger)
      // await loadBasic(engine); // Charge les bases (mouvement, opacité, taille)
      // await loadImageShape(engine); // Charge la forme d'image (notre feuille)

      // Option 2: Si tu utilises des fonctionnalités plus complexes ou préfères la simplicité
      // await loadFull(engine); // Charge tout

      // On part sur l'Option 1 pour l'exemple, car c'est plus optimisé si ça suffit
      await loadBasic(engine);
      await loadImageShape(engine);
    }).then(() => {
      setInit(true); // Moteur prêt
    });
  }, []);
  // --- Fin Initialisation Particules ---

  // --- Configuration des particules (feuilles) ---
  // Correction: Renommé en 'particlesOptions' pour correspondre à l'usage plus bas
  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false }, // Important: les particules restent dans leur conteneur
      fpsLimit: 60,
      interactivity: {
        events: { onClick: { enable: false }, onHover: { enable: false } },
      },
      particles: {
        number: { value: 20, density: { enable: true, area: 800 } }, // Réduit un peu pour la performance
        shape: {
          type: "image",
          image: { src: "/images/leaf.png", width: 100, height: 100 },
        }, // Utilise la taille réelle de l'image pour le calcul initial
        opacity: {
          value: { min: 0.3, max: 0.8 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.2,
            sync: false,
          },
        },
        size: { value: { min: 15, max: 30 } }, // Taille variable
        move: {
          enable: true,
          direction: "bottom",
          speed: { min: 1, max: 2.5 }, // Vitesse de chute
          gravity: { enable: true, acceleration: 0.3 }, // Gravité légère
          drift: { min: -0.3, max: 0.3 }, // Mouvement latéral
          outModes: { default: "out", top: "destroy" }, // Disparaît en bas, détruit en haut (au cas où)
          straight: false,
          random: true,
          trail: { enable: false }, // Pas de traînée
          // Ajout de wobble et tilt pour un effet plus naturel
          wobble: {
            distance: 15,
            enable: true,
            speed: { angle: 50, move: 10 },
          },
          tilt: {
            direction: "random",
            enable: true,
            value: { min: 0, max: 360 },
            animation: { enable: true, speed: 5 },
          },
        },
      },
      detectRetina: true,
    }),
    [] // Dépendances vides pour useMemo
  );
  // --- Fin Configuration Particules ---

  // Animation Framer Motion pour le texte (réutilisée)
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      // Ajout d'un paramètre de délai
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: "easeOut" },
    }),
  };

  // Attendre que le moteur de particules soit prêt
  if (!init) {
    // Optionnel: Afficher un skeleton ou un loader simple ici
    // return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
    return null;
  }

  return (
    // La structure flex col est gérée par layout.tsx maintenant
    <>
      {/* --- Hero Section --- */}
      {/* Utilisation des hauteurs responsives et classes de la description */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Image de fond */}
        <Image
          src="/images/entete.jpg"
          alt="Tiny house dans un paysage naturel"
          fill
          priority // Charger en priorité
          style={{ objectFit: "cover", zIndex: -2 }} // z-index bas
          quality={85} // Qualité d'image (ajuster si besoin)
        />
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/60 z-[-1]"></div>

        {/* Composant Particules (dans le flux, pas en absolute pour être contenu) */}
        <Particles
          id="tsparticles-leaves"
          options={particlesOptions} // Correction du nom de la variable
          className="absolute inset-0 z-0 pointer-events-none" // Positionné derrière le texte, ignore les clics
        />

        {/* Conteneur pour le texte animé (positionné au-dessus des particules) */}
        <div className="relative z-10 max-w-4xl px-4">
          {/* Utilisation des tailles responsives et variantes animées */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0} // Délai pour h1
          >
            Votre Évasion Minimaliste Commence Ici
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0.2} // Délai pour p
          >
            Découvrez et réservez des tiny houses uniques pour une expérience
            inoubliable.
          </motion.p>
        </div>
      </section>
      {/* --- Fin Hero Section --- */}

      {/* ===== SECTION : Texte de Présentation ===== */}
      <section className="container mx-auto px-4 py-16 md:py-20 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Bienvenue dans l'Univers des Tiny Houses
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Découvrez une nouvelle façon de voyager et de vous reconnecter. Nos
          tiny houses, nichées dans des cadres uniques, offrent un mélange
          parfait de design astucieux, de confort essentiel et de proximité avec
          la nature. Que vous cherchiez l'aventure, la tranquillité ou une
          simple pause, votre refuge idéal vous attend.
        </motion.p>
      </section>
      {/* ===== FIN SECTION Texte de Présentation ===== */}

      {/* --- Liste des Propriétés --- */}
      {/* Utilisation du container pour la cohérence, ajout d'un id pour ancre possible */}
      <section id="locations" className="container mx-auto px-4 pb-16 md:pb-20">
        {" "}
        {/* pb au lieu de mb */}
        {/* Optionnel : Ajout d'un titre pour cette section */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 md:mb-12">
          Nos Refuges Disponibles
        </h2>
        <PropertyList />
      </section>
      {/* --- Fin Liste des Propriétés --- */}

      {/* --- Formulaire de Contact --- */}
      {/* Ajustement padding pour cohérence */}
      <section id="contact" className="bg-muted/50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Une Question ? Contactez-Nous
          </h2>
          <p className="text-base text-muted-foreground mb-8">
            Besoin d'informations supplémentaires sur une location, les
            disponibilités ou une demande spécifique ? Notre équipe est là pour
            vous aider. Remplissez le formulaire et nous reviendrons vers vous
            rapidement.
          </p>
          <ContactForm />
        </div>
      </section>
      {/* --- Fin Formulaire de Contact --- */}

      {/* Le Footer est maintenant géré par layout.tsx, donc pas besoin de le mettre ici */}
    </>
  );
}
