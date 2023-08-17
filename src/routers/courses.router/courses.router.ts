import { Router } from "express";
import { checkValidBody } from "../../middlewares/allChecks.middlewares/checkValidBody.middlewares";
import { coursesCreateSchema } from "../../schemas/cousers.schema/cousers.schema";
import {
  createCourse,
  searchCourses,
} from "../../controllers/courses.controllers/courses.controllers";
import { checkUserPermission } from "../../middlewares/allChecks.middlewares/checkUserPermission.middlewares";
import { checkValidToken } from "../../middlewares/allChecks.middlewares/checkValidToken.middlewares";
import { checkExistingUserId } from "../../middlewares/users.middlewares/users.middlewares";
import { checkExistingCourseId } from "../../middlewares/courses.middlewares/courses.middlewares";
import {
  deleteUserCourse,
  enrollUserInCourse,
  searchCoursesByIdUser,
} from "../../controllers/userCourses.controllers/userCourses.controllers";

export const CoursesRouter: Router = Router();

CoursesRouter.post(
  "/",
  checkValidBody(coursesCreateSchema),
  checkValidToken,
  checkUserPermission,
  createCourse
);
CoursesRouter.post(
  "/:courseId/users/:userId",
  checkExistingCourseId,
  checkExistingUserId,
  checkValidToken,
  checkUserPermission,
  enrollUserInCourse
);

CoursesRouter.get("/", searchCourses);
CoursesRouter.get(
  "/:id/users",
  checkValidToken,
  checkUserPermission,
  searchCoursesByIdUser
);

CoursesRouter.delete(
  "/:courseId/users/:userId",
  checkExistingCourseId,
  checkExistingUserId,
  checkValidToken,
  checkUserPermission,
  deleteUserCourse
);
