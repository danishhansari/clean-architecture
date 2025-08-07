import { InferInsertModel } from "drizzle-orm";
import { airplane } from "../db/schema";
import { AirplaneRepository } from "../repositories";

const airplaneRepo = new AirplaneRepository();
const createAirplane = async (data: InferInsertModel<typeof airplane>) => {
  try {
    const response = airplaneRepo.create(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const getAirplanes = async () => {
  try {
    const response = await airplaneRepo.getAll();
    return response;
  } catch (error) {
    throw error;
  }
};

export default { getAirplanes, createAirplane };
