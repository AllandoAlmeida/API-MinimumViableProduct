import { z } from "zod";
import { QueryResult } from "pg";
import {
  userCousersCreateSchema,
  userCousersSchema,
  userCousersUpDateSchema,
} from "../../schemas/userCourses.schema/userCourses.schema";
import { Courses } from "../cousers.interfaces/cousers.interfaces";
import { Users } from "../users.interfaces/users.interfaces";

export type UserAndCourses = {
  user: Users;
  course: Courses;
};

export type UserAndCoursesResult = QueryResult<UserAndCourses>;

export type UserCourses = z.infer<typeof userCousersSchema>;
export type userCousersCreate = z.infer<typeof userCousersCreateSchema>;
export type userCousersUpDate = z.infer<typeof userCousersUpDateSchema>;

export type UserCoursesResult = QueryResult<UserCourses>;
