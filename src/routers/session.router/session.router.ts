import { Router } from "express";
import { checkValidBody } from "../../middlewares/allChecks.middlewares/checkValidBody.middlewares";
import { sessionCreate } from "../../schemas/session.schema/session.schema";
import { createUserLogin } from "../../controllers/session.controllers/session.controllers";

export const sessionRouter: Router = Router();

sessionRouter.post("", checkValidBody(sessionCreate), createUserLogin);
