import { z } from 'zod';

export const loanApplicationSchema = z.object({
  _id: z.string(),
  values: z.record(z.string(), z.any()),
  status: z.enum(['pending', 'approved', 'rejected']),
  createdAt: z.string().optional(),
  subscriber: z.string(),
});

export type LoanApplication = z.infer<typeof loanApplicationSchema>; 