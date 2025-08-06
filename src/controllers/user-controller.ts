import { Context } from "hono";
import { baseResponse } from "../types";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils";
import { createUser } from "../services";

const userController = async (c: Context) => {
  const body: baseResponse = {
    success: true,
    message: "API is live",
    error: {},
    data: {},
  };
  logger.info("Success hit the API", {});
  const user = await createUser({});
  
  c.status(StatusCodes.OK);
  return c.json(body);
};

export { userController };
