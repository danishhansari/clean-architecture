import { Hono } from "hono";
import { CityController } from "../../controllers";
import { cityMiddleware } from "../../middlewares";

const cityRoute = new Hono();

cityRoute.post(
  "/",
  async (c, next) => cityMiddleware.validateCity(c, next),
  async (c) => CityController.createCity(c)
);

cityRoute.get("/", async (c) => CityController.getCities(c));
cityRoute.get("/:id", async (c) => CityController.getCity(c));
cityRoute.delete("/:id", async (c) => CityController.deleteCity(c));
cityRoute.patch(
  "/:id",
  async (c, next) => cityMiddleware.validateCity(c, next),
  async (c) => CityController.updateCity(c)
);

export { cityRoute };
