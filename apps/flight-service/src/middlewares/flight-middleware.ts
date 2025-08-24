import { Context, Next } from "hono";
import { AppError } from "@repo/commons";
import { StatusCodes } from "http-status-codes";

const validateFlight = async (c: Context, next: Next) => {
  const body = await c.req.json();
  const required = [
    "flightNumber",
    "airplaneId",
    "departureAirportId",
    "arrivalAirportId",
    "arrivalTime",
    "departureTime",
    "price",
    "totalSeats",
  ];

  const missing = required.filter((f) => !body[f]?.toString().trim());

  if (missing.length) {
    c.status(StatusCodes.BAD_REQUEST);
    return c.json({
      message: "Something went wrong while creating new flight",
      error: new AppError(
        `${missing.join(", ")} cannot be empty`,
        StatusCodes.BAD_REQUEST
      ),
    });
  }

  await next();
};

const validateUpdateSeats = async (c: Context, next: Next) => {
  const body = await c.req.json();
  const required = ["seats"];

  const missing = required.filter((f) => !body[f]?.toString().trim());

  if (missing.length) {
    c.status(StatusCodes.BAD_REQUEST);
    return c.json({
      message: "Something went wrong while creating new flight",
      error: new AppError(
        `${missing.join(", ")} cannot be empty`,
        StatusCodes.BAD_REQUEST
      ),
    });
  }

  await next();
};

export default { validateFlight, validateUpdateSeats };
