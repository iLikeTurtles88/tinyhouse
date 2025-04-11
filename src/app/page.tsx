
"use client";

import PropertyList from '@/components/property-list';
import React, {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Space_Grotesk} from "next/font/google";
import {Filter} from "@/components/filter";

const spaceGrotesk = Space_Grotesk({subsets: ['latin']});

export default function Home() {
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const handleLocationChange = (location: string) => {
    setLocationFilter(location);
  };

  return (
    <div className={`p-6 ${spaceGrotesk.className}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Havres Minuscules de Retraite</h1>
        <p className="text-md text-muted-foreground text-center">Découvrez nos tiny houses uniques dans des lieux exceptionnels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Filter Section */}
        <aside className="md:col-span-1">
          <div className="bg-secondary rounded-lg p-4">
            <Select onValueChange={handleLocationChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtrer par Lieu"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les Lieux</SelectItem>
                <SelectItem value="Asheville, NC">Asheville, NC</SelectItem>
                <SelectItem value="Malibu, CA">Malibu, CA</SelectItem>
                <SelectItem value="Lake Tahoe, CA">Lake Tahoe, CA</SelectItem>
                <SelectItem value="Sedona, AZ">Sedona, AZ</SelectItem>
                <SelectItem value="New York, NY">New York, NY</SelectItem>
                <SelectItem value="Maui, HI">Maui, HI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>

        {/* Property List Section */}
        <section className="md:col-span-2">
          <PropertyList locationFilter={locationFilter}/>
        </section>
      </div>
    </div>
  );
}
