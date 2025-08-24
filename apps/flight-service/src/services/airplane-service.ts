import { InferInsertModel } from "drizzle-orm";
import { airplane } from "@repo/db";
import { AirplaneRepository } from "../repositories";
import { AppError } from "@repo/commons";
import { StatusCodes } from "http-status-codes";

const airplaneRepo = new AirplaneRepository();
const createAirplane = async (data: InferInsertModel<typeof airplane>) => {
  try {
    const response = await airplaneRepo.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot create plane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirplanes = async () => {
  try {
    const response = await airplaneRepo.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the planes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirplane = async (id: string) => {
  try {
    return await airplaneRepo.getById(id);
  } catch (error) {
    // @ts-ignore
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of the plane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteAirplane = async (id: string) => {
  try {
    return await airplaneRepo.delete(id);
  } catch (error) {
    // @ts-ignore
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you requested to delete is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot delete data of the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateAirplane = async (
  id: string,
  data: Partial<InferInsertModel<typeof airplane>>
) => {
  try {
    return await airplaneRepo.update(id, data);
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
  getAirplanes,
  createAirplane,
  getAirplane,
  deleteAirplane,
  updateAirplane,
};
