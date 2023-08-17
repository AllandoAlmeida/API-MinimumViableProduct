import { QueryResult } from "pg";
import { z } from "zod";
import {
  usersSchema,
  usersCreateSchema,
  usersUpDateSchema,
} from "../../schemas/users.schema/users.schema";

export type Users = z.infer<typeof usersSchema>;

export type UsersCreate = z.infer<typeof usersCreateSchema>;
export type UsersSearch = Array<Users>;
export type UsersUpdate = z.infer<typeof usersUpDateSchema>;

export type UsersResult = QueryResult<Users>;
export type UsersRequest = Omit<Users, "id">;
