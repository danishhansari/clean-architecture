import { InferInsertModel } from "drizzle-orm";
import { flight } from "@repo/db";
import { FlightRepository } from "../repositories";
import { AppError } from "@repo/commons";
import { StatusCodes } from "http-status-codes";
import { compareDateTime } from "@repo/commons";
import { Params } from "hono/router";
import { UpdateSeatsType } from "@repo/types";

const flightRepo = new FlightRepository();
const createFlight = async (data: InferInsertModel<typeof flight>) => {
  try {
    if (compareDateTime(data.arrivalTime, data.departureTime)) {
      throw new AppError(
        "Departure time cannot be less than arrival time",
        StatusCodes.BAD_REQUEST
      );
    }
    const response = await flightRepo.create(data);
    return response;
  } catch (error) {
    if (
      error instanceof AppError &&
      error.statusCode === StatusCodes.BAD_REQUEST
    ) {
      throw error;
    }
    throw new AppError(
      "Cannot create flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllFlights = async (query: Params) => {
  const customFilters: Record<string, string | number | Date> = {};
  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilters.departureAirportId = departureAirportId;
    customFilters.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    const [minPrice, maxPrice] = query.price.split("-");
    customFilters.price = query.price;
    customFilters.minPrice = Number(minPrice);
    customFilters.maxPrice = maxPrice != undefined ? Number(maxPrice) : 20000;
  }
  if (query.travellers) {
    customFilters.totalSeats = query.travellers;
  }

  if (query.tripDate) {
    const start = new Date(query.tripDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    customFilters.startDate = start;
    customFilters.endDate = end;
    customFilters.tripDate = query.tripDate;
  }
  try {
    const flights = await flightRepo.getAllFlights(customFilters);
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetch the data of all the flights ",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getFlight = async (id: number) => {
  try {
    const flight = await flightRepo.getFlightById(id);
    if (!flight) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return flight;
  } catch (error) {
    throw new AppError(
      "Cannot fetch the data of all the flights ",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateSeats = async (data: UpdateSeatsType) => {
  try {
    const response = await flightRepo.updateRemainingSeats(
      data.flightId,
      data.seats,
      data.decrement
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot update the seats",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
