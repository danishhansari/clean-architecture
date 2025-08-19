import { Hono } from "hono";
import { FlightController } from "../../controllers";
import { flightMiddleware } from "../../middlewares";

const flightRoute = new Hono();

flightRoute.post(
  "/",
  async (c, next) => flightMiddleware.validateFlight(c, next),
  async (c) => FlightController.createFlight(c)
);
flightRoute.get("/", async (c) => FlightController.getAllFlights(c));
flightRoute.get("/:id", async (c) => FlightController.getFlight(c));

export { flightRoute };
