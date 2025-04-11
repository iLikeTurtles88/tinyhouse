"use client";

import PropertyList from '@/components/property-list';
import Filter from '@/components/filter';
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider} from "@/components/ui/sidebar";
import {Icons} from "@/components/icons";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {recommendProperty} from "@/ai/flows/property-recommendation-flow";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "@/hooks/use-toast";

export default function Home() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRecommendation = async (location: string, budget: number, amenities: string[]) => {
    setLoading(true);
    try {
      const result = await recommendProperty({
        location: location,
        budget: budget,
        amenities: amenities,
      });
      setRecommendation(result.propertyDescription);
      toast({
        title: 'Property Recommendation Generated',
        description: 'Successfully generated a property recommendation.',
      });
    } catch (error) {
      console.error('Error generating recommendation:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate property recommendation.',
      });
      setRecommendation('Failed to generate property recommendation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h1 className="text-2xl font-bold">Tiny Haven Retreats</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" >
                <Icons.home/>
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <Icons.settings/>
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarGroup>
            <Filter onRecommend={handleRecommendation} loading={loading}/>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="outline">
            <Icons.help className="mr-2"/>
            Help
          </Button>
        </SidebarFooter>
      </Sidebar>
      <div className="ml-64 p-4">
        {recommendation && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Recommended Property</CardTitle>
              <CardDescription>Based on your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{recommendation}</p>
            </CardContent>
          </Card>
        )}
        <PropertyList/>
      </div>
    </SidebarProvider>
  );
}
