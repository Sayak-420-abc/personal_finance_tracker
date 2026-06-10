import { z } from 'zod';

export const createCategorySchema = z.object({
  name:  z.string().min(1, 'Name is required').max(50, 'Name too long'),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Invalid hex color').optional().default('#6366f1'),
  icon:  z.string().max(30).optional().default('tag'),
});

export const updateCategorySchema = createCategorySchema.partial();
