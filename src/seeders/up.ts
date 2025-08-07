import { seed } from "drizzle-seed";
import { db } from "../db";
import { airplane } from "../db/schema";

const up = async () => {
  await seed(db, { airplane });
};

up();
