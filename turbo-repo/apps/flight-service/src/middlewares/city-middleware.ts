import { Context, Next } from "hono";
import { ErrorResponse, AppError } from "@repo/commons";
import { StatusCodes } from "http-status-codes";

const validateCity = async (c: Context, next: Next) => {
  const { name } = await c.req.json();
  if (!name) {
    ErrorResponse.message = "Something went wrong while creating new city";
    ErrorResponse.error = new AppError(
      "City name cannot be empty",
      StatusCodes.BAD_REQUEST
    );
    c.status(StatusCodes.BAD_REQUEST);
    return c.json(ErrorResponse);
  }
  await next();
};

export default { validateCity };
