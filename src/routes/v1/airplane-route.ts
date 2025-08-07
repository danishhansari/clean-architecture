import { Hono } from "hono";
import { AirplaneController } from "../../controllers";

const airplaneRoute = new Hono();

airplaneRoute.get("/", async (c) => AirplaneController.getAirplanes(c));
airplaneRoute.post("/", async (c) => AirplaneController.createAirplane(c));

export { airplaneRoute };
