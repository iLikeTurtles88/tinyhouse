"use client";

import PropertyList from '@/components/property-list';
import {Space_Grotesk} from "next/font/google";
import ContactForm from "@/components/contact-form";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({subsets: ['latin']});

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen ${spaceGrotesk.className}`}>

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-center text-white bg-gray-800 overflow-hidden">
        <Image
          src="https://a0.muscache.com/im/pictures/miso/Hosting-57300906/original/649b7791-5f7a-49a8-b9f7-8b05c88ff176.jpeg?im_w=1920"
          alt="Tiny House Retreat"
          layout="fill"
          objectFit="cover"
          className="absolute z-0 opacity-60"
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Tiny Houses</h1>
          <p className="text-xl">Découvrez la liberté et le confort de nos tiny houses uniques.</p>
        </div>
      </section>

      {/* Property List Section */}
      <section className="p-6">
        <PropertyList/>
      </section>

      {/* Contact Section */}
      <section className="bg-secondary p-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-4">Contactez-nous</h2>
        <p className="text-md text-muted-foreground text-center mb-6">
          Intéressé par une de nos tiny houses ? Contactez-nous pour plus d'informations.
        </p>
        <ContactForm/>
      </section>

      {/* Footer */}
      <footer className="text-center p-4 text-muted-foreground">
        © {new Date().getFullYear()} Tiny Houses. Tous droits réservés.
      </footer>
    </div>
  );
}
