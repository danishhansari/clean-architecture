import { Hono } from "hono";
import { bookingRoute } from "./booking-route";
const v1 = new Hono();

v1.basePath("/booking").route("/", bookingRoute);
export { v1 };
