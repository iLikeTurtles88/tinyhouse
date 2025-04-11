'use server';

/**
 * @fileOverview An AI agent for selecting a tiny house from a predefined list.
 *
 * - selectProperty - A function that handles the property selection process.
 * - SelectPropertyInput - The input type for the selectProperty function.
 * - SelectPropertyOutput - The return type for the selectProperty function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SelectPropertyInputSchema = z.object({
  location: z.string().describe('The preferred location for the tiny house.'),
  budget: z.number().describe('The budget for the tiny house.'),
  amenities: z.array(z.string()).optional().describe('The desired amenities for the tiny house.'),
});

export type SelectPropertyInput = z.infer<typeof SelectPropertyInputSchema>;

const SelectPropertyOutputSchema = z.object({
  propertyDescription: z.string().describe('A detailed description of the selected tiny house.'),
});

export type SelectPropertyOutput = z.infer<typeof SelectPropertyOutputSchema>;

export async function selectProperty(input: SelectPropertyInput): Promise<SelectPropertyOutput> {
  return selectPropertyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selectPropertyPrompt',
  input: {
    schema: z.object({
      location: z.string().describe('The preferred location for the tiny house.'),
      budget: z.number().describe('The budget for the tiny house.'),
      amenities: z.array(z.string()).optional().describe('The desired amenities for the tiny house.'),
    }),
  },
  output: {
    schema: z.object({
      propertyDescription: z.string().describe('A detailed description of the selected tiny house.'),
    }),
  },
  prompt: `You are an AI that selects tiny houses based on user preferences. 
  Provide a detailed description of a tiny house that matches the following criteria:

Location: {{location}}
Budget: {{budget}}
{{#if amenities}}
Amenities: {{amenities}}
{{/if}}

Property Description:`,
});

const selectPropertyFlow = ai.defineFlow<
  typeof SelectPropertyInputSchema,
  typeof SelectPropertyOutputSchema
>({
  name: 'selectPropertyFlow',
  inputSchema: SelectPropertyInputSchema,
  outputSchema: SelectPropertyOutputSchema,
}, async input => {
  // Dummy data for tiny houses
  const tinyHouses = [
    {
      location: 'Asheville, NC',
      budget: 200,
      propertyDescription: 'Cozy cabin in Asheville. Perfect for mountain retreats.',
    },
    {
      location: 'Malibu, CA',
      budget: 300,
      propertyDescription: 'Stunning beach house in Malibu. Enjoy ocean views.',
    },
    {
      location: 'Lake Tahoe, CA',
      budget: 250,
      propertyDescription: 'Charming cottage in Lake Tahoe. Ideal for lake activities.',
    },
    {
      location: 'Sedona, AZ',
      budget: 180,
      propertyDescription: 'Rustic retreat in Sedona. Discover desert beauty.',
    },
    {
      location: 'New York, NY',
      budget: 350,
      propertyDescription: 'Chic apartment in New York. Experience city living.',
    },
    {
      location: 'Maui, HI',
      budget: 320,
      propertyDescription: 'Tropical bungalow in Maui. Escape to paradise.',
    },
  ];

  // Filter tiny houses based on input criteria (e.g., location, budget, amenities)
  const filteredHouses = tinyHouses.filter(house =>
    house.location === input.location && house.budget <= input.budget
  );

  if (filteredHouses.length > 0) {
    // Select a tiny house (e.g., the first one)
    const selectedHouse = filteredHouses[0];
    return { propertyDescription: selectedHouse.propertyDescription };
  } else {
    return { propertyDescription: 'No matching property found.' };
  }

  const {output} = await prompt(input);
  return output!;
});
