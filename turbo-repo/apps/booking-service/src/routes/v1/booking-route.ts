import { Hono } from "hono";
import { BookingController } from "../../controllers";
import { BookingMiddleware } from "../../middlewares";

const bookingRoute = new Hono();

bookingRoute.post(
  "/",
  async (c, next) => BookingMiddleware.validateBooking(c, next),
  async (c) => BookingController.createBooking(c)
);

bookingRoute.post("/payments", async (c) => BookingController.makeBooking(c));

export { bookingRoute };
