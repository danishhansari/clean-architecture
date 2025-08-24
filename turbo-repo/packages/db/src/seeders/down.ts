import { reset } from "drizzle-seed";
import { db } from "../db";
import * as schema from "../schema";

export const down = async () => {
  await reset(db, schema);
};
