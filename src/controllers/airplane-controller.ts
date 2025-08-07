import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { AirplaneService } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils/commons";

const createAirplane = async (c: Context) => {
  try {
    const body = await c.req.json();
    const airplane = await AirplaneService.createAirplane({
      modelNumber: body.modelNumber,
      capacity: body.capacity,
    });
    SuccessResponse.data = airplane;

    c.status(StatusCodes.CREATED);
    return c.json(SuccessResponse);
  } catch (error) {
    // @ts-ignore
    ErrorResponse.error = error;
    c.json(ErrorResponse);
  }
};

const getAirplanes = async (c: Context) => {
  try {
    const airplanes = await AirplaneService.getAirplanes();
    SuccessResponse.data = airplanes;

    c.status(StatusCodes.OK);
    return c.json(SuccessResponse);
  } catch (error) {
    // @ts-ignore
    ErrorResponse.error = error;
    c.json(ErrorResponse);
  }
};

export default { getAirplanes, createAirplane };
