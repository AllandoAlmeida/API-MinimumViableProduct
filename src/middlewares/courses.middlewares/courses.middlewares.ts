import { NextFunction, Request, Response, request } from "express";
import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors/AppError.errors";
import {
  CoursesResult,
  Courses,
} from "../../interfaces/cousers.interfaces/cousers.interfaces";

export const checkExistingCourseId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { courseId } = request.params;
  const queryString = `
      SELECT * FROM "courses" WHERE id = $1
      `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [courseId],
  };
  const queryResult: CoursesResult = await client.query(queryConfig);
  const existingId: Courses = queryResult.rows[0];

  if (!existingId) {
    throw new AppError("User/course not found", 404);
  }
  return next();
};
