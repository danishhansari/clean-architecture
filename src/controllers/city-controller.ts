import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { CityService } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils/commons";

const createCity = async (c: Context) => {
  try {
    const body = await c.req.json();
    const airplane = await CityService.createCity({
      name: body.name,
    });
    SuccessResponse.data = airplane;

    c.status(StatusCodes.CREATED);
    return c.json(SuccessResponse);
  } catch (error) {
    // @ts-ignore
    ErrorResponse.error = error;
    //  @ts-ignore
    c.status(error.statusCode);
    return c.json(ErrorResponse);
  }
};

export default { createCity };
