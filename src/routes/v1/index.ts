import { Hono } from "hono";
import { userController } from "../../controllers";

const v1 = new Hono();

v1.get("/", (c) => userController(c));

export { v1 };
