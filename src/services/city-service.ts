import { DrizzleQueryError, InferInsertModel } from "drizzle-orm";
import { city } from "../db/schema";
import { CityRepository } from "../repositories";
import { AppError } from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";

const cityRepo = new CityRepository();
const createCity = async (data: InferInsertModel<typeof city>) => {
  try {
    const response = await cityRepo.create(data);
    return response;
  } catch (error: unknown) {
    if (error instanceof DrizzleQueryError) {
      const cause = error.cause;
      // @ts-ignore
      if (cause.code == 23502) {
        throw new AppError("City name cannot be empty", StatusCodes.CONFLICT);
      }
      // @ts-ignore
      if (cause.code == 23505) {
        throw new AppError(
          "City name cannot be duplicate",
          StatusCodes.CONFLICT
        );
      }
    }
    throw new AppError("Cannot create city", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getCities = async () => {
  try {
    const response = await cityRepo.getAll();
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch data of all the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getCity = async (id: string) => {
  try {
    const response = await cityRepo.getById(id);
    return response;
  } catch (error) {
    // @ts-ignore
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of the plane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteCity = async (id: string) => {
  try {
    const response = await cityRepo.delete(id);
    return response;
  } catch (error) {
    // @ts-ignore
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested to delete is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot delete data of the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateCity = async (
  id: string,
  data: Partial<InferInsertModel<typeof city>>
) => {
  try {
    return await cityRepo.update(id, data);
  } catch (error) {
    // @ts-ignore
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Can't update this because no record found with this ID",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot delete data of the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  getCities,
  createCity,
  getCity,
  deleteCity,
  updateCity,
};
