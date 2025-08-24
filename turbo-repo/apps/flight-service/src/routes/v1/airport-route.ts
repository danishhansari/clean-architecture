import { Hono } from "hono";
import { AirportController } from "../../controllers";
import { airportMiddleware } from "../../middlewares";

const airportRoute = new Hono();

airportRoute.post(
  "/",
  async (c, next) => airportMiddleware.validateAirport(c, next),
  async (c) => AirportController.createAirport(c)
);
airportRoute.get("/", async (c) => AirportController.getAirports(c));
airportRoute.patch("/:id", async (c) => AirportController.updateAirport(c));
airportRoute.get("/:id", async (c) => AirportController.getAirport(c));
airportRoute.delete("/:id", async (c) => AirportController.deleteAirport(c));

export { airportRoute };
