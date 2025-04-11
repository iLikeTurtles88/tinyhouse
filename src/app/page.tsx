"use client";

import PropertyList from '@/components/property-list';
import React, {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function Home() {
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const handleLocationChange = (location: string) => {
    setLocationFilter(location);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tiny Haven Retreats</h1>
        <Select onValueChange={handleLocationChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Location"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
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

