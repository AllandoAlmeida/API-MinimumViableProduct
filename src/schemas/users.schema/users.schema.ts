import { z } from "zod";

export const usersSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().email().max(50),
  password: z.string().max(120),
  admin: z.boolean().default(false),
});

export const usersCreateSchema = usersSchema.omit({ id: true });
export const UsersResult = usersSchema.omit({password:true})
export const usersUpDateSchema = usersCreateSchema.partial();
