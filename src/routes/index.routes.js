import { Router } from "express";
import { usersRouter } from "./users.routes.js";
import { studentsRouter } from "./students.routes.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/students", studentsRouter);

export { router };
