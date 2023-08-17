import { usersSchema } from "../users.schema/users.schema";


export const sessionCreate = usersSchema.pick({
  email: true,
  password: true,
});

