import { QueryConfig, QueryResult } from "pg";
import {
  UserAndCourses,
  UserCourses,
  UserCoursesResult,
} from "../../interfaces/userCourses.interfaces/userCourses.interfaces";
import { client } from "../../database";

export const addUserInCourse = async (
  courseId: string,
  userId: string
): Promise<UserCourses> => {
  const queryString: string = `
    INSERT INTO "userCourses"
    ("userId", "courseId")
    VALUES
    ($1, $2)
    RETURNING *;    
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId, courseId],
  };
  const queryResult: UserCoursesResult = await client.query(queryConfig);
  const newUserInCourse: UserCourses = queryResult.rows[0];

  return newUserInCourse;
};

export const coursesByIdUser = async (params: {
  id: number;
}): Promise<Array<UserAndCourses>> => {
  const queryString: string = `
      SELECT
      "u".id AS "userId",
      "u"."name" AS "userName",
      "c".id AS "courseId",
      "c"."name" AS "courseName",
      "c"."description" AS "courseDescription",
      "uc"."active" AS "userActiveInCourse"
  FROM "users" AS "u"
  JOIN "userCourses" AS "uc" ON "uc"."userId" = "u"."id"
  JOIN "courses" AS "c" ON "uc"."courseId" = "c".id
  WHERE "c"."id" = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [params.id],
  };

  const queryResult: QueryResult<UserAndCourses> = await client.query(
    queryConfig
  );

  const listCoursesByIdUser: Array<UserAndCourses> = queryResult.rows;
  return listCoursesByIdUser;
};

export const allCoursesOfUser = async (params: {
  id: number;
}): Promise<Array<UserAndCourses>> => {
  const queryString: string = `
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
    values: [params.id],
  };

  const queryResult: QueryResult<UserAndCourses> = await client.query(
    queryConfig
  );

  const listUsersAllCourses: Array<UserAndCourses> = queryResult.rows;
  return listUsersAllCourses;
};

export const deleteUserInCourse = async (
  courseId: string,
  userId: string
): Promise<void> => {
  const queryString: string = `
      UPDATE "userCourses"
      SET "active" = false
      WHERE "userId" = $1 AND "courseId" = $2;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId, courseId],
  };
  await client.query(queryConfig);
};
