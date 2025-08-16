import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { FlightService } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils/commons";
import { Params } from "hono/router";

const createFlight = async (c: Context) => {
  try {
    const body = await c.req.json();
    const flight = await FlightService.createFlight({
      flightNumber: body.flightNumber,
      airplaneId: body.airplaneId,
      departureAirportId: body.departureAirportId,
      arrivalAirportId: body.arrivalAirportId,
      arrivalTime: body.arrivalTime,
      departureTime: body.departureTime,
      price: body.price,
      boardingGate: body.boardingGate,
      totalSeats: body.totalSeats,
    });
    SuccessResponse.data = flight;

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

const getAllFlights = async (c: Context) => {
  try {
    const query = c.req.query();
    const flights = await FlightService.getAllFlights(query);
    SuccessResponse.data = flights;
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

export default {
  createFlight,
  getAllFlights,
};
