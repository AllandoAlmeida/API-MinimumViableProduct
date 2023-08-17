import { z } from "zod";
import { sessionCreate } from "../../schemas/session.schema/session.schema";

export type SessionCreate = z.infer<typeof sessionCreate>;
export type SessionReturn = { token: string };
