"use client"

import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {useState, useEffect, useRef} from "react";
import {useToast} from "@/hooks/use-toast";

interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  price: number;
  amenities: string[];
  reviews: string[];
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({property}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const {toast} = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
  }, []);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{property.name}</CardTitle>
        <CardDescription>{property.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={property.imageUrl} alt={property.name} className="w-full h-48 object-cover mb-4 rounded-md"/>

        <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted/>

        { !(hasCameraPermission) && (
          <Alert variant="destructive">
            <AlertTitle>Camera Access Required</AlertTitle>
            <AlertDescription>
              Please allow camera access to use this feature.
            </AlertDescription>
          </Alert>
        )
        }
        <p>{property.description}</p>
        <p className="font-bold mt-2">Price: ${property.price}</p>
        <div className="flex space-x-2 mt-2">
          {property.amenities.map((amenity) => (
            <span key={amenity} className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{amenity}</span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Book Now</Button>
        <Calendar/>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
