import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError.errors";
import { verify } from "jsonwebtoken";

export const checkValidToken = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authorization: string | undefined = request.headers.authorization;
  if (!authorization) throw new AppError("Missing bearer token", 401);

  const token: string = authorization.split(" ")[1];

  const decoded = verify(token, process.env.SECRET_KEY!);
  response.locals = { ...response.locals, decoded };

  return next();
};