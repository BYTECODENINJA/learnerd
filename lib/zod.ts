import { z } from 'zod';

export const UploadSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  author: z.string().min(1, 'Author is required').max(100),
  voice: z.string().min(1, 'Voice is required'),
  file: z.any().refine((files) => files?.length > 0, 'Book file is required'),
  cover: z.any().optional(),
});
