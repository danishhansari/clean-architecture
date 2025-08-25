import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { AirplaneService } from "../services";
import { ErrorResponse, SuccessResponse } from "@repo/commons";

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
    //  @ts-ignore
    c.status(error.statusCode);
    return c.json(ErrorResponse);
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
    //  @ts-ignore
    c.status(error.statusCode);
    return c.json(ErrorResponse);
  }
};

const getAirplane = async (c: Context) => {
  try {
    const body = c.req.param();
    const id = body.id;
    const airplane = await AirplaneService.getAirplane(id);
    SuccessResponse.data = airplane;
    c.status(StatusCodes.OK);
    return c.json(SuccessResponse);
  } catch (error) {
    // @ts-ignore
    ErrorResponse.error = error;
    //  @ts-ignore
    c.status(error.statusCode);
    return c.json(ErrorResponse);
  }
};

const deleteAirplane = async (c: Context) => {
  try {
    const body = c.req.param();
    const id = body.id;
    const airplane = await AirplaneService.deleteAirplane(id);
    SuccessResponse.data = airplane;
    c.status(StatusCodes.OK);
    return c.json(SuccessResponse);
  } catch (error) {
    // @ts-ignore
    ErrorResponse.error = error;
    //  @ts-ignore
    c.status(error.statusCode);
    return c.json(ErrorResponse);
  }
};

const updateAirplane = async (c: Context) => {
  try {
    const body = await c.req.json();
    const id = c.req.param().id;
    const airplane = await AirplaneService.updateAirplane(id, body);
    SuccessResponse.data = airplane;
    c.status(StatusCodes.OK);
    return c.json(SuccessResponse);
  } catch (error) {
    // @ts-ignore
    ErrorResponse.error = error;
    //  @ts-ignore
    c.status(error.statusCode);
    return c.json(ErrorResponse);
  }
};

export default {
  getAirplanes,
  createAirplane,
  getAirplane,
  deleteAirplane,
  updateAirplane,
};
