'use server';

/**
 * @fileOverview An AI agent for recommending tiny houses based on user preferences.
 *
 * - recommendProperty - A function that handles the property recommendation process.
 * - RecommendPropertyInput - The input type for the recommendProperty function.
 * - RecommendPropertyOutput - The return type for the recommendProperty function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RecommendPropertyInputSchema = z.object({
  location: z.string().describe('The preferred location for the tiny house.'),
  budget: z.number().describe('The budget for the tiny house.'),
  amenities: z.array(z.string()).optional().describe('The desired amenities for the tiny house.'),
});

export type RecommendPropertyInput = z.infer<typeof RecommendPropertyInputSchema>;

const RecommendPropertyOutputSchema = z.object({
  propertyDescription: z.string().describe('A detailed description of the recommended tiny house.'),
});

export type RecommendPropertyOutput = z.infer<typeof RecommendPropertyOutputSchema>;

export async function recommendProperty(input: RecommendPropertyInput): Promise<RecommendPropertyOutput> {
  return recommendPropertyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendPropertyPrompt',
  input: {
    schema: z.object({
      location: z.string().describe('The preferred location for the tiny house.'),
      budget: z.number().describe('The budget for the tiny house.'),
      amenities: z.array(z.string()).optional().describe('The desired amenities for the tiny house.'),
    }),
  },
  output: {
    schema: z.object({
      propertyDescription: z.string().describe('A detailed description of the recommended tiny house.'),
    }),
  },
  prompt: `You are an AI that recommends tiny houses based on user preferences. 
  Provide a detailed description of a tiny house that matches the following criteria:

Location: {{location}}
Budget: {{budget}}
{{#if amenities}}
Amenities: {{amenities}}
{{/if}}

Property Description:`,
});

const recommendPropertyFlow = ai.defineFlow<
  typeof RecommendPropertyInputSchema,
  typeof RecommendPropertyOutputSchema
>({
  name: 'recommendPropertyFlow',
  inputSchema: RecommendPropertyInputSchema,
  outputSchema: RecommendPropertyOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
