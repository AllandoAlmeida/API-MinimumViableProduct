import { Request, Response } from "express";
import { coursesCreateSchema } from "../../schemas/cousers.schema/cousers.schema";
import {
  addNewCourse,
  searchAllCourses,
} from "../../services/courses.services/courses.services";

export const createCourse = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const validatedCoursesData = coursesCreateSchema.parse(request.body);
  const newCourse = await addNewCourse(validatedCoursesData);
  return response.status(201).json(newCourse);
};

export const searchCourses = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const listCourses = await searchAllCourses();
  return response.status(200).json(listCourses);
};
