import { Hono } from "hono";
import { airplaneRoute } from "./airplane-route";

const v1 = new Hono();

v1.basePath("/airplane").route("/", airplaneRoute);

export { v1 };
