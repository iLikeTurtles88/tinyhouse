"use client";

import PropertyList from '@/components/property-list';
import React, {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Space_Grotesk} from "next/font/google";

const spaceGrotesk = Space_Grotesk({subsets: ['latin']});

export default function Home() {
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const handleLocationChange = (location: string) => {
    setLocationFilter(location);
  };

  return (
    <div className={`p-4 ${spaceGrotesk.className}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Havres Minuscules de Retraite</h1>
        <Select onValueChange={handleLocationChange}>
          <SelectTrigger className="w-[180px]">
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
      <PropertyList locationFilter={locationFilter}/>
    </div>
  );
}
