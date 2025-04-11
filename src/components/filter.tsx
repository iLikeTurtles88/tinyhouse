"use client"

import React from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const Filter = () => {
  return (
    <div className="mb-4 flex space-x-2">
      <Input type="text" placeholder="Location" className="max-w-sm" />
      <Input type="number" placeholder="Price" className="max-w-sm" />
      <Button>Filter</Button>
    </div>
  );
};

export default Filter;
