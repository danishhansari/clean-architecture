import { Hono } from "hono";
import { v1 } from "./v1";

const allRoutes = new Hono();

allRoutes.route("/v1", v1);

export { allRoutes };
