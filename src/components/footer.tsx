// src/components/footer.tsx
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button"; // Importez le Button de Shadcn

const Footer = () => {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      {" "}
      {/* Léger flou si arrière-plan visible */}
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
        {/* Section Copyright */}
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Tiny House Location. Tous droits
            réservés.
          </p>
          {/* Ajoutez ici d'autres liens si nécessaire (ex: Politique de confidentialité) */}
          {/* <Link href="/privacy-policy" className="hover:text-primary transition-colors">Politique de confidentialité</Link> */}
        </div>

        {/* Section Icônes Sociales */}
        <div className="flex items-center space-x-3">
          <p className="hidden sm:inline mr-2">Suivez-nous :</p>
          <a
            href="https://facebook.com/votrepage" // <-- Remplacez par votre URL Facebook
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitez notre page Facebook"
            className="inline-block"
          >
            <Button variant="ghost" size="icon" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Button>
          </a>
          <a
            href="https://instagram.com/votrecompte" // <-- Remplacez par votre URL Instagram
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitez notre profil Instagram"
            className="inline-block"
          >
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
