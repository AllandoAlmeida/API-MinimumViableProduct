import { z } from "zod";

export const coursesSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50).nonempty(),
  description: z.string().nonempty(), 
});
export const coursesCreateSchema = coursesSchema.omit({ id: true });
export const coursesUpDateSchema = coursesCreateSchema.partial();
