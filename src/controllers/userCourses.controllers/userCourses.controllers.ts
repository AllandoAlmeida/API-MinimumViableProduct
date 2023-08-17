import { Request, Response } from "express";
import {
  addUserInCourse,
  allCoursesOfUser,
  coursesByIdUser,
  deleteUserInCourse,
} from "../../services/userCourses.services/userCourses.services";

export const enrollUserInCourse = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { userId, courseId } = request.params;

  await addUserInCourse(courseId, userId);

  return response
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

export const searchAllCoursesOfUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  const listUsersAllCourses = await allCoursesOfUser({ id: Number(id) });
  return response.status(200).json(listUsersAllCourses);
};

export const searchCoursesByIdUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const listCoursesByIdUser = await coursesByIdUser({ id: Number(id) });

  return response.status(200).json(listCoursesByIdUser);
};

export const deleteUserCourse = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const courseId: string = request.params.courseId;
  const userId: string = request.params.userId;

  await deleteUserInCourse(courseId, userId);
  return response.status(204).json();
};
