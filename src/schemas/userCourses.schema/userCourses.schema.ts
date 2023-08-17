import { z } from "zod";

export const userCousersSchema = z.object({
  id: z.number().positive(),
  active: z.boolean().default(false),
  userId: z.number().positive(),
  courseId: z.number().positive(),
});

export const userCousersCreateSchema = userCousersSchema.omit({ id: true });
export const userCousersUpDateSchema = userCousersCreateSchema.partial();
