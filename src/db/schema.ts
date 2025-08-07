import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const airplane = pgTable("airplanes", {
  id: serial("id").primaryKey(),
  modelNumber: varchar({ length: 80 }).notNull(),
  capacity: integer().default(0),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
