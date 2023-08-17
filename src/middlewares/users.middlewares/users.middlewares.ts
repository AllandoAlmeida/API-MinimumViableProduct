import { Request, Response, NextFunction, request } from "express";
import { QueryConfig } from "pg";
import {
  Users,
  UsersResult,
} from "../../interfaces/users.interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../errors/AppError.errors";
import { UserAndCoursesResult } from "../../interfaces/userCourses.interfaces/userCourses.interfaces";

export const checkExistingEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const newEmail: string = request.body.email;
  const queryString = "SELECT * FROM users WHERE email = $1";
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [newEmail],
  };
  const queryResult: UsersResult = await client.query(queryConfig);
  const existingEmail: Users = queryResult.rows[0];

  if (existingEmail) {
    throw new AppError("Email already registered", 409);
  }
  return next();
};

export const checkExistingUserId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { userId } = request.params;
  const queryString = `
    SELECT * FROM "users" WHERE id = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };
  const queryResult: UsersResult = await client.query(queryConfig);
  const existingId: Users = queryResult.rows[0];

  if (!existingId) {
    throw new AppError("User/course not found", 404);
  }
  return next();
};

export const checkExistingId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { id } = request.params;
  const queryString = `
    SELECT * FROM "users" WHERE id = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: UsersResult = await client.query(queryConfig);
  const existingId: Users = queryResult.rows[0];

  if (!existingId) {
    throw new AppError("User not found", 404);
  }
  return next();
};

export const checkUserAssociatedWithCoursesById = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { id } = request.params;
  const queryString = `
  SELECT
  "c".id AS "courseId",
  "c"."name" AS "courseName",
  "c"."description" AS "courseDescription",
  "uc"."active" AS "userActiveInCourse",
  "u".id AS "userId",
  "u"."name" AS "userName"
FROM "users" AS "u"
JOIN "userCourses" AS "uc" ON "uc"."userId" = "u"."id"
JOIN "courses" AS "c" ON "uc"."courseId" = "c".id
WHERE "u"."id" = $1;
`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: UserAndCoursesResult = await client.query(queryConfig);
  const associatedCourses: number = queryResult.rowCount;

  if (associatedCourses === 0) {
    throw new AppError("No course found", 404);
  }
  return next();
};
