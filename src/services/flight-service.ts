import { InferInsertModel } from "drizzle-orm";
import { flight } from "../db/schema";
import { FlightRepository } from "../repositories";
import { AppError } from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";

const flightRepo = new FlightRepository();
const createFlight = async (data: InferInsertModel<typeof flight>) => {
  try {
    const response = await flightRepo.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot create flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
export default {
  createFlight,
};
