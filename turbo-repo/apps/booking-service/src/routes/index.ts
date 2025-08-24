import { Hono } from "hono";
import { v1 } from "./v1";

const allRoutes = new Hono();

allRoutes.basePath("/v1").route("/", v1);

export { allRoutes };
