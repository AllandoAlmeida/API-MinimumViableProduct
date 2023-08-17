import { Request, Response } from "express";
import {
  addNewUser,
  searchAllUsers,
} from "../../services/users.services/users.services";
import {
  UsersResult,
  usersCreateSchema,
} from "../../schemas/users.schema/users.schema";

export const createUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const validatedUserData = usersCreateSchema.parse(request.body);
  const newUser = await addNewUser(validatedUserData);
  const ResponseUser = UsersResult.parse(newUser);
  return response.status(201).json(ResponseUser);
};

export const searchUsers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const listUsers = await searchAllUsers();
  const newListUsers = listUsers.map((user) => UsersResult.parse(user));
  return response.status(200).json(newListUsers);
};
