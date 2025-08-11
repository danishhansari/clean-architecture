import { Hono } from "hono";
import { FlightController } from "../../controllers";
import { flightMiddleware } from "../../middlewares";

const flightRoute = new Hono();

flightRoute.post(
  "/",
  async (c, next) => flightMiddleware.validateFlight(c, next),
  async (c) => FlightController.createFlight(c)
);
export { flightRoute };
