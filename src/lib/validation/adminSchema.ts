import { z } from 'zod';

export const adminCreationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  plan: z.string().min(1, 'Plan is required'),
  planName: z.string().min(1, 'Plan name is required'),
  role: z.string().min(1, 'Role is required'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
});

export type AdminCreation = z.infer<typeof adminCreationSchema>; 