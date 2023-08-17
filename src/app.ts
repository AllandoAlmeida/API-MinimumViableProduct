import "express-async-errors";
import express, { Application, json } from "express";
import { UserRouter } from "./routers/users.routers/users.router";
import { HandleError } from "./errors/handle.erros";
import { sessionRouter } from "./routers/session.router/session.router";
import { CoursesRouter } from "./routers/courses.router/courses.router";

export const app: Application = express();
app.use(json());

app.use("/users", UserRouter);
app.use("/login", sessionRouter);
app.use("/courses", CoursesRouter);
app.use(HandleError);
