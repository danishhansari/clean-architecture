import { Context, Next } from "hono";
import { AppError } from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";

const validateAirport = async (c: Context, next: Next) => {
  const body = await c.req.json();
  const required = ["name", "code", "cityId"];

  const missing = required.filter((f) => !body[f]?.toString().trim());

  if (missing.length) {
    c.status(StatusCodes.BAD_REQUEST);
    return c.json({
      message: "Something went wrong while creating new airport",
      error: new AppError(
        `${missing.join(", ")} cannot be empty`,
        StatusCodes.BAD_REQUEST
      ),
    });
  }

  await next();
};

export default { validateAirport };
