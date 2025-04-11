"use client";

import React, {useEffect, useState} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";
import {summarizeReviews} from "@/ai/flows/review-summary";
import {Skeleton} from "@/components/ui/skeleton";
import {ScrollArea} from "@/components/ui/scroll-area";

interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrls: string[];
  videoUrl: string;
  price: number;
  amenities: string[];
  reviews: string[];
  capacity: number;
  bedrooms: number;
  bathrooms: number;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({property}) => {
  const {toast} = useToast();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [updatedReviews, setUpdatedReviews] = useState(property.reviews);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  useEffect(() => {
    const getAiSummary = async () => {
      setIsLoadingSummary(true);
      try {
        const output = await summarizeReviews({
          reviews: updatedReviews,
          propertyDescription: property.description,
        });
        setAiSummary(output?.summary ?? 'Aucun résumé disponible.');
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Erreur lors de la génération du résumé',
          description: 'Impossible de générer le résumé des avis pour le moment.',
        });
        console.error('Error summarizing reviews:', e);
      } finally {
        setIsLoadingSummary(false);
      }
    };
    void getAiSummary();
  }, [updatedReviews, property.description, toast]);
  const handleAddReview = () => {
    if (newReview.trim() !== '') {
      setUpdatedReviews([...updatedReviews, newReview]);
      setNewReview('');
      setIsReviewDialogOpen(false);
      toast({
        title: 'Avis ajouté avec succès!',
        description: 'Votre avis a été ajouté à la liste.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Veuillez entrer un avis valide.',
      });
    }
  };
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{property.name}</CardTitle>
        <CardDescription>{property.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto space-x-2 mb-4">
          {property.imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`${property.name} - Image ${index + 1}`}
              className="w-64 h-48 object-cover rounded-md flex-shrink-0"
            />
          ))}
        </div>
        <video src={property.videoUrl} className="w-full aspect-video rounded-md" controls muted/>
        <p>{property.description}</p>
        <p className="font-bold mt-2">Prix: ${property.price}</p>
        <p>Capacité: {property.capacity} invités</p>
        <p>Chambres: {property.bedrooms}</p>
        <p>Salles de bain: {property.bathrooms}</p>
        <div className="flex space-x-2 mt-2">
          {property.amenities.map((amenity) => (
            <span key={amenity} className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{amenity}</span>
          ))}
        </div>
        <section className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Avis des clients</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {updatedReviews.length > 0 ? (
              <ul className="list-disc pl-5">
                {updatedReviews.map((review, index) => (
                  <li key={index} className="mb-2">
                    {review}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun avis disponible pour le moment.</p>
            )}
          </ScrollArea>
          <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-2">
                Ajouter un avis
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un avis</DialogTitle>
                <DialogDescription>
                  Partagez votre expérience avec cette tiny house.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="review">Votre avis</Label>
                  <Textarea
                    id="review"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Écrivez votre avis ici"
                  />
                </div>
              </div>
              <Button type="submit" onClick={handleAddReview}>
                Soumettre
              </Button>
            </DialogContent>
          </Dialog>
        </section>
        <section className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Résumé des avis (IA)</h3>
          {isLoadingSummary ? (
            <Skeleton className="h-10 w-full"/>
          ) : (
            <p>{aiSummary ?? 'Aucun résumé disponible.'}</p>
          )}
        </section>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Réserver</Button>
        <Calendar/>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
