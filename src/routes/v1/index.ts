import { Hono } from "hono";
import { airplaneRoute } from "./airplane-route";
import { cityRoute } from "./city-route";

const v1 = new Hono();

v1.basePath("/airplane").route("/", airplaneRoute);
v1.basePath("/city").route("/", cityRoute);

export { v1 };
