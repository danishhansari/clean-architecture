import { InferInsertModel } from "drizzle-orm";
import { airplane } from "../db/schema";
import { AirplaneRepository } from "../repositories";
import { AppError } from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";

const airplaneRepo = new AirplaneRepository();
const createAirplane = async (data: InferInsertModel<typeof airplane>) => {
  try {
    return airplaneRepo.create(data);
  } catch (error) {
    throw new AppError(
      "Cannot create plane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAirplanes = async () => {
  try {
    return await airplaneRepo.getAll();
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
      console.log(error);
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

export default { getAirplanes, createAirplane, getAirplane };
