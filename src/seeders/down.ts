import { reset } from "drizzle-seed";
import { db } from "../db";
import { airplane } from "../db/schema";

const down = async () => {
  await reset(db, { airplane });
};

down();
