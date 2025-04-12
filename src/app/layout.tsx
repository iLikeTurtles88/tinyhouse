import type { Metadata } from "next"; // <-- Importer Metadata
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer"; // Assure-toi que l'import est correct
import { Toaster } from "@/components/ui/toaster"; // Assure-toi que l'import est correct

// --- Définition des Métadonnées pour le Partage ---
export const metadata: Metadata = {
  // --- Informations Générales ---
  title: "TinyHouse Location - Votre Évasion Minimaliste", // Titre affiché dans l'onglet et les résultats de recherche
  description:
    "Explorez, réservez et vivez l'expérience unique d'une tiny house. Trouvez votre refuge idéal pour une escapade.", // Description courte

  // --- Open Graph (Facebook, LinkedIn, WhatsApp, etc.) ---
  openGraph: {
    title: "TinyHouse Location - Votre Évasion Minimaliste", // Titre pour le partage
    description:
      "Découvrez notre sélection unique de tiny houses à louer pour une expérience inoubliable.", // Description pour le partage
    // IMPORTANT: Remplace ceci par l'URL finale de ton site déployé sur Vercel ou ton domaine perso
    url: "https://tinyhouse-two.vercel.app", // Exemple: https://tinyhouse-gamma.vercel.app
    siteName: "TinyHouse Location", // Nom de ton site
    // IMPORTANT: Chemin ABSOLU vers ton image. Combine l'URL du site + chemin public
    images: [
      {
        url: "https://tinyhouse-two.vercel.app/images/logo.png", // URL complète vers ton logo
        // IMPORTANT: Ajoute la largeur et la hauteur EXACTES de ton logo.png
        width: 1024, // À remplacer par la largeur réelle de logo.png
        height: 1024, // À remplacer par la hauteur réelle de logo.png
        alt: "Logo TinyHouse Location", // Texte alternatif pour l'image
      },
      // Optionnel: Tu peux ajouter d'autres images (par ex. une image plus grande et rectangulaire pour une meilleure preview)
      // {
      //   url: "https://YOUR_VERCEL_DEPLOYMENT_URL.vercel.app/images/og-image.jpg", // Créer une image dédiée (ex: 1200x630px)
      //   width: 1200,
      //   height: 630,
      //   alt: 'Location de Tiny Houses',
      // },
    ],
    locale: "fr_BE", // Ou fr_BE si pertinent
    type: "website", // Type de contenu
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary", // Type de carte (summary_large_image est souvent mieux visuellement)
    title: "TinyHouse Location - Votre Évasion Minimaliste", // Titre pour Twitter
    description: "Explorez et réservez votre prochaine escapade en tiny house!", // Description pour Twitter
    // creator: '@YourTwitterHandle', // Optionnel: Ton handle Twitter
    images: ["https://tinyhouse-two.vercel.app/images/logo.png"], // URL complète vers l'image pour Twitter
  },

  // --- Autres métadonnées optionnelles ---
  // metadataBase: new URL('https://YOUR_VERCEL_DEPLOYMENT_URL.vercel.app'), // Aide Next.js à résoudre les URLs relatives si besoin
  // themeColor: '#ffffff', // Couleur pour la barre d'adresse sur mobile
  // icons: { // Favicons et icônes d'application
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
};
// --- Fin Définition Métadonnées ---

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col", // Assure flex flex-col ici
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        {/* main prend l'espace restant grâce à flex-grow */}
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
