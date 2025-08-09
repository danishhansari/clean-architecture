import { Hono } from "hono";
import { airplaneRoute } from "./airplane-route";
import { cityRoute } from "./city-route";
import { airportRoute } from "./airport-route";

const v1 = new Hono();

v1.basePath("/airplane").route("/", airplaneRoute);
v1.basePath("/city").route("/", cityRoute);
v1.basePath("/airport").route("/", airportRoute);

export { v1 };
