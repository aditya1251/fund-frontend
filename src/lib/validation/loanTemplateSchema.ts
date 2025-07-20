import { z } from 'zod';

export const templateFieldSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  type: z.string(),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  acceptedTypes: z.array(z.string()).optional(),
  maxSize: z.number().optional(),
});

export const loanFormTemplateSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'Template name is required'),
  loanType: z.string().optional(),
  fields: z.array(templateFieldSchema),
  createdBy: z.string(),
});

export type TemplateField = z.infer<typeof templateFieldSchema>;
export type LoanFormTemplate = z.infer<typeof loanFormTemplateSchema>; 