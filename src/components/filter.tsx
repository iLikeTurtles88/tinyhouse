
"use client";

import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";

interface FilterProps {
  onRecommend: (location: string, budget: number, amenities: string[]) => void;
  loading: boolean;
}

const Filter: React.FC<FilterProps> = ({onRecommend, loading}) => {
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState<number | undefined>(undefined);
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleRecommend = () => {
    if (location && budget) {
      onRecommend(location, budget, amenities);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="location">Location</Label>
      <Input
        type="text"
        id="location"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Label htmlFor="budget">Budget</Label>
      <Input
        type="number"
        id="budget"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />

      <Label htmlFor="amenities">Amenities</Label>
      <Input
        type="text"
        id="amenities"
        placeholder="Amenities (comma-separated)"
        onChange={(e) => setAmenities(e.target.value.split(',').map((item) => item.trim()))}
      />

      <Button onClick={handleRecommend} disabled={loading}>
        {loading ? 'Loading...' : 'Get Recommendation'}
      </Button>
    </div>
  );
};

export default Filter;
