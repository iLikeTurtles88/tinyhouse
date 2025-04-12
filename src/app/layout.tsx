// src/app/layout.tsx

import type { Metadata } from "next";
// Utilisation de vos imports de police spécifiques
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer"; // <-- 1. Importer le composant Footer
import { cn } from "@/lib/utils"; // <-- 2. Importer l'utilitaire cn (assurez-vous qu'il existe dans lib/utils.ts)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Pensez à mettre à jour ces métadonnées pour correspondre à votre projet "Location de Tiny Houses"
export const metadata: Metadata = {
  title: "Location de Tiny Houses", // Modifié
  description: "Découvrez et réservez des tiny houses uniques.", // Modifié
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Vous voudrez peut-être changer lang="fr" si votre contenu principal est en français
    <html lang="en" suppressHydrationWarning>
      <body
        // 3. Utiliser cn pour combiner les classes et ajouter la structure flex
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col", // <-- Ajout des classes pour layout + fond/police de base
          geistSans.variable, // Variable de police Sans
          geistMono.variable // Variable de police Mono
        )}
      >
        {/* Vous pourriez ajouter un Header / Navbar ici si nécessaire */}

        {/* 4. Wrapper le contenu principal avec <main> et lui donner flex-grow */}
        <main className="flex-grow">{children}</main>

        {/* 5. Placer le composant Footer ici, après <main> */}
        <Footer />

        {/* Le Toaster reste généralement à la fin */}
        <Toaster />
      </body>
    </html>
  );
}
