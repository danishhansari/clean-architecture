import { Hono } from "hono";
import { AirplaneController } from "../../controllers";

const airplaneRoute = new Hono();

airplaneRoute.get("/", async (c) => AirplaneController.getAirplanes(c));
airplaneRoute.post("/", async (c) => AirplaneController.createAirplane(c));
airplaneRoute.get("/:id", async (c) => AirplaneController.getAirplane(c));

export { airplaneRoute };
