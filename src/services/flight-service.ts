import { InferInsertModel } from "drizzle-orm";
import { flight } from "../db/schema";
import { FlightRepository } from "../repositories";
import { AppError } from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";
import { compareDateTime } from "../utils/helpers/datetime-helper";
import { Params } from "hono/router";

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
  // const customFilters: Partial<InferInsertModel<typeof flight>> = {};
  const customFilters: any = {};
  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilters.departureAirportId = departureAirportId;
    customFilters.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    const [minPrice, maxPrice] = query.price.split("-");
    customFilters.minPrice = Number(minPrice);
    customFilters.maxPrice =
      maxPrice != undefined ? Number(maxPrice) : maxPrice;
  }
  if (query.travellers) {
    customFilters.totalSeats = query.travellers;
  }

  try {
    const flights = await flightRepo.getAllFlights(customFilters);
    return flights;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch the data of all the flights ",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  createFlight,
  getAllFlights,
};
