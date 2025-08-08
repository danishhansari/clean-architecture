import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { CityService } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils/commons";

const createCity = async (c: Context) => {
  try {
    const body = await c.req.json();
    const city = await CityService.createCity({
      name: body.name,
    });
    SuccessResponse.data = city;

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

const getCities = async (c: Context) => {
  try {
    const response = await CityService.getCities();
    SuccessResponse.data = response;

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

const getCity = async (c: Context) => {
  try {
    const body = c.req.param();
    const id = body.id;
    const city = await CityService.getCity(id);
    SuccessResponse.data = city;
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

const deleteCity = async (c: Context) => {
  try {
    const body = c.req.param();
    const id = body.id;
    const city = await CityService.deleteCity(id);
    SuccessResponse.data = city;
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

const updateCity = async (c: Context) => {
  try {
    const body = await c.req.json();
    const id = c.req.param().id;
    const city = await CityService.updateCity(id, body);
    SuccessResponse.data = city;
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

export default { createCity, getCities, getCity, deleteCity, updateCity };
