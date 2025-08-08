import { Hono } from "hono";
import { CityController } from "../../controllers";
import { cityMiddleware } from "../../middlewares";

const cityRoute = new Hono();

cityRoute.post(
  "/",
  async (c, next) => cityMiddleware.validateCity(c, next),
  async (c) => CityController.createCity(c)
);

export { cityRoute };
