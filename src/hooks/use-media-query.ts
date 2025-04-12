// src/hooks/use-media-query.ts
"use client"; // Ce hook utilise des API navigateur et useState/useEffect

import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour suivre l'état d'une media query CSS.
 * @param query La chaîne de la media query (ex: '(min-width: 768px)')
 * @returns true si la query correspond, false sinon.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Vérifier si window.matchMedia est supporté (évite erreurs SSR/build)
    if (typeof window.matchMedia !== "function") {
      // Pour un hook utilisé dans un composant client, on peut souvent retourner false par défaut.
      // Si un comportement spécifique est nécessaire côté serveur, il faudrait une logique différente.
      // console.warn("useMediaQuery: window.matchMedia is not supported. Defaulting to false.");
      // Set matches to false on server or unsupported envs
      setMatches(false);
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    // Fonction pour mettre à jour l'état en fonction de la correspondance
    const updateMatches = () => {
      // Simplifié sans paramètre event pour l'appel initial
      setMatches(mediaQueryList.matches);
    };

    // Définir l'état initial côté client après le premier rendu
    updateMatches();

    // Écouter les changements
    try {
      mediaQueryList.addEventListener("change", updateMatches);
    } catch (e1) {
      try {
        mediaQueryList.addListener(updateMatches); // Fallback
      } catch (e2) {
        console.error(
          "useMediaQuery: Could not add listener for media query changes.",
          e2
        );
      }
    }

    // Nettoyer l'écouteur
    return () => {
      try {
        mediaQueryList.removeEventListener("change", updateMatches);
      } catch (e1) {
        try {
          mediaQueryList.removeListener(updateMatches); // Fallback
        } catch (e2) {
          console.error(
            "useMediaQuery: Could not remove listener for media query changes.",
            e2
          );
        }
      }
    };
  }, [query]); // Ré-exécuter l'effet si la query change

  return matches;
}

export default useMediaQuery;
