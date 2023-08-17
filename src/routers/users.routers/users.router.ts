import { Router } from "express";
import {
  createUser,
  searchUsers,
} from "../../controllers/users.controller/users.controller";
import {
  checkExistingEmail,
  checkExistingId,
  checkUserAssociatedWithCoursesById,
} from "../../middlewares/users.middlewares/users.middlewares";
import { usersCreateSchema } from "../../schemas/users.schema/users.schema";
import { checkValidBody } from "../../middlewares/allChecks.middlewares/checkValidBody.middlewares";
import { checkValidToken } from "../../middlewares/allChecks.middlewares/checkValidToken.middlewares";
import { checkUserPermission } from "../../middlewares/allChecks.middlewares/checkUserPermission.middlewares";
import { searchAllCoursesOfUser } from "../../controllers/userCourses.controllers/userCourses.controllers";

export const UserRouter: Router = Router();

UserRouter.post(
  "/",
  checkValidBody(usersCreateSchema),
  checkExistingEmail,
  createUser
);
UserRouter.get("/", checkValidToken, checkUserPermission, searchUsers);
UserRouter.get(
  "/:id/courses",
  checkExistingId,
  checkUserAssociatedWithCoursesById,
  checkValidToken,
  checkUserPermission,
  searchAllCoursesOfUser
);
