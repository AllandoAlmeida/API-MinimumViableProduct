import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const checkValidBody =
  (schema: z.ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction): void => {
    request.body = schema.parse(request.body);
    return next();
  };
