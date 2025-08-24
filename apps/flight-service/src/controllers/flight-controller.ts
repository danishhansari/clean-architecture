import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { FlightService } from "../services";
import { ErrorResponse, SuccessResponse } from "@repo/commons";

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

const getFlight = async (c: Context) => {
  try {
    const params = c.req.param();
    const id = Number(params.id);
    const flight = await FlightService.getFlight(id);
    SuccessResponse.data = flight;
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

const updateSeats = async (c: Context) => {
  try {
    const body = await c.req.json();
    const param = c.req.param();
    const payload = {
      flightId: Number(param.id),
      seats: Number(body.seats),
      decrement: body.decrement,
    };
    const updateSeats = await FlightService.updateSeats(payload);
    SuccessResponse.data = updateSeats;
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
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
