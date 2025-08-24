import { InferInsertModel } from "drizzle-orm";
import { airport } from "@repo/db";
import { AirportRepository } from "../repositories";
import { AppError } from "@repo/commons";
import { StatusCodes } from "http-status-codes";

const airportRepo = new AirportRepository();
const createAirport = async (data: InferInsertModel<typeof airport>) => {
  try {
    return airportRepo.create(data);
  } catch (error) {
    throw new AppError(
      "Cannot create airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirports = async () => {
  try {
    const response = await airportRepo.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the planes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirport = async (id: string) => {
  try {
    const response = await airportRepo.getById(id);
    return response;
  } catch (error) {
    // @ts-ignore
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airport you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of the plane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteAirport = async (id: string) => {
  try {
    const response = await airportRepo.delete(id);
    return response;
  } catch (error) {
    // @ts-ignore
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airport you requested to delete is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot delete data of the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateAirport = async (
  id: string,
  data: Partial<InferInsertModel<typeof airport>>
) => {
  try {
    const response = await airportRepo.update(id, data);
    return response;
  } catch (error) {
    // @ts-ignore
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Can't update this because no record found with this ID",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot delete data of the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  getAirports,
  createAirport,
  getAirport,
  deleteAirport,
  updateAirport,
};
