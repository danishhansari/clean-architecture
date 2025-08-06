import { UserRepository } from "../repositories";

const userRepo = new UserRepository();
export const createUser = (data: any) => {
  try {
    const user = userRepo.create(data);
    return user;
  } catch (error) {
    throw error;
  }
};
