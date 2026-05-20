import { z } from 'zod';

export const createLeadSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, 'Name must be at least 2 characters')
      .trim(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format')
      .toLowerCase(),
    status: z
      .enum(['New', 'Contacted', 'Qualified', 'Lost'])
      .optional()
      .default('New'),
    source: z.enum(['Website', 'Instagram', 'Referral'], {
      required_error: 'Source is required',
    }),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .trim()
      .optional(),
    email: z.string().email('Invalid email format').toLowerCase().optional(),
    status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).optional(),
    source: z.enum(['Website', 'Instagram', 'Referral']).optional(),
  }),
});

export type CreateLeadSchema = z.infer<typeof createLeadSchema>;
export type UpdateLeadSchema = z.infer<typeof updateLeadSchema>;