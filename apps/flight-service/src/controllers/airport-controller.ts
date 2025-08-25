import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { AirportService } from "../services";
import { ErrorResponse, SuccessResponse } from "@repo/commons";

const createAirport = async (c: Context) => {
  try {
    const body = await c.req.json();
    const airport = await AirportService.createAirport({
      name: body.name,
      code: body.code,
      address: body.address,
      cityId: body.cityId,
    });
    SuccessResponse.data = airport;

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

const getAirports = async (c: Context) => {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;

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

const getAirport = async (c: Context) => {
  try {
    const body = c.req.param();
    const id = body.id;
    const airport = await AirportService.getAirport(id);
    SuccessResponse.data = airport;
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

const deleteAirport = async (c: Context) => {
  try {
    const body = c.req.param();
    const id = body.id;
    const airport = await AirportService.deleteAirport(id);
    SuccessResponse.data = airport;
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

const updateAirport = async (c: Context) => {
  try {
    const body = await c.req.json();
    const id = c.req.param().id;
    const airplane = await AirportService.updateAirport(id, body);
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
  getAirport,
  createAirport,
  getAirports,
  deleteAirport,
  updateAirport,
};
