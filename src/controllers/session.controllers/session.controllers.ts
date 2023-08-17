import { Request, Response } from "express";
import { userLogin } from "../../services/session.services/session.services";
import { SessionReturn } from "../../interfaces/session.interfaces/session.interfaces";

export const createUserLogin = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const token: SessionReturn = await userLogin(request.body);
  return response.status(200).json(token);
};
