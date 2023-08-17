import {
  Courses,
  CoursesCreate,
  CoursesResult,
} from "../../interfaces/cousers.interfaces/cousers.interfaces";
import { client } from "../../database";
import format from "pg-format";

export const addNewCourse = async (
  courseBody: CoursesCreate
): Promise<Courses> => {
  const queryString: string = format(
    `
        INSERT INTO "courses"
        (%I)
        VALUES
        (%L)
        RETURNING *;
        `,
    Object.keys(courseBody),
    Object.values(courseBody)
  );
  const queryResult: CoursesResult = await client.query(queryString);
  const newCourse: Courses = queryResult.rows[0];

  return newCourse;
};


export const searchAllCourses = async (): Promise<Array<Courses>> => {
  const queryString: string = 
    `
    SELECT * FROM "courses"
    `;
  const queryResult: CoursesResult = await client.query(queryString);
  const listCourses: Array<Courses> = queryResult.rows;
  return listCourses;
};