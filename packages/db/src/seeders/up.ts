import { seed } from "drizzle-seed";
import { db } from "../db";
import * as schema from "../schema";

export const up = async () => {
  await seed(db, schema);
};
