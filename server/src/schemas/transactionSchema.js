import { z } from 'zod';

export const createTransactionSchema = z.object({
  type:       z.enum(['income', 'expense']),
  title:      z.string().min(1, 'Title is required').max(100, 'Title too long'),
  amount:     z.number().positive('Amount must be positive'),
  categoryId: z.string().length(24, 'Invalid category ID'),
  date:       z.coerce.date(),
  notes:      z.string().max(300, 'Notes too long').optional().default(''),
});

export const updateTransactionSchema = createTransactionSchema.partial();
