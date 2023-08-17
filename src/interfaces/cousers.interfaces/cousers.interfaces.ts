import { QueryResult } from "pg";
import { z } from "zod";
import {
  coursesSchema,
  coursesCreateSchema,
  coursesUpDateSchema,
} from "../../schemas/cousers.schema/cousers.schema";

export type Courses = z.infer<typeof coursesSchema>;

export type CoursesCreate = z.infer<typeof coursesCreateSchema>;
export type CoursesUpDate = z.infer<typeof coursesUpDateSchema>;

export type CoursesResult = QueryResult<Courses>;
