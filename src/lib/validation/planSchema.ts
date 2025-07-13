// lib/validation/planSchema.ts
import { z } from "zod";

export const planSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  duration: z.number(),
  features: z.array(z.string()).min(1, "Select at least one feature"),
  isActive: z.boolean(),
});

export type PlanFormData = z.infer<typeof planSchema>;
