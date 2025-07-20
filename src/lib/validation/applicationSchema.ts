import { z } from 'zod';

export const applicationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  message: z.string().min(1, 'Message is required'),
});

export type Application = z.infer<typeof applicationSchema>; 