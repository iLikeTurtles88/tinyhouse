'use server';

/**
 * @fileOverview Summarizes user reviews for a tiny house, highlighting key pros and cons.
 *
 * - summarizeReviews - A function that generates a summary of user reviews.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeReviewsInputSchema = z.object({
  reviews: z.array(
    z.string().describe('A user review for the tiny house.')
  ).describe('An array of user reviews for the tiny house.'),
  propertyDescription: z.string().optional().describe('A description of the property.'),
});
export type SummarizeReviewsInput = z.infer<typeof SummarizeReviewsInputSchema>;

const SummarizeReviewsOutputSchema = z.object({
  summary: z.string().describe('A summary of the reviews, highlighting key pros and cons.'),
});
export type SummarizeReviewsOutput = z.infer<typeof SummarizeReviewsOutputSchema>;

export async function summarizeReviews(input: SummarizeReviewsInput): Promise<string> {
  const {output} = await summarizeReviewsFlow(input);
  return output!.summary;
}

const prompt = ai.definePrompt({
  name: 'summarizeReviewsPrompt',
  input: {
    schema: z.object({
      reviews: z.array(
        z.string().describe('A user review for the tiny house.')
      ).describe('An array of user reviews for the tiny house.'),
      propertyDescription: z.string().optional().describe('A description of the property.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A summary of the reviews, highlighting key pros and cons.'),
    }),
  },
  prompt: `You are an AI that summarizes user reviews for tiny houses. Provide a summary that highlights the key pros and cons mentioned in the reviews.

Reviews:
{{#each reviews}}{{{this}}}
{{/each}}

{{#if propertyDescription}}
Property Description: {{{propertyDescription}}}
{{/if}}

Summary: `,
});

const summarizeReviewsFlow = ai.defineFlow<
  typeof SummarizeReviewsInputSchema,
  typeof SummarizeReviewsOutputSchema
>({
  name: 'summarizeReviewsFlow',
  inputSchema: SummarizeReviewsInputSchema,
  outputSchema: SummarizeReviewsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});

