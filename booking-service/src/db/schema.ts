import { integer, pgEnum, pgTable, serial } from "drizzle-orm/pg-core";
import { STATUS } from "../utils/commons";

const { BOOKED, CANCELLED, PENDING, INITIATED } = STATUS;

export const statusEnum = pgEnum("statusEnum", [
  BOOKED,
  CANCELLED,
  PENDING,
  INITIATED,
]);

export const booking = pgTable("booking", {
  id: serial("id").primaryKey(),
  flightId: integer().notNull(),
  userId: integer().notNull(),
  totalCost: integer().notNull(),
  status: statusEnum().notNull().default(INITIATED),
  noOfSeats: integer().notNull().default(1),
});
