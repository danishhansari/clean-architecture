import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const airplane = pgTable(
  "airplanes",
  {
    id: serial("id").primaryKey(),
    modelNumber: varchar({ length: 80 }).notNull(),
    capacity: integer().default(0),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
  },
  (table) => [uniqueIndex("id_idx").on(table.id)]
);

export const city = pgTable("city", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 50 }).notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const airport = pgTable(
  "airport",
  {
    id: serial("id").primaryKey(),
    name: varchar({ length: 50 }).notNull(),
    address: varchar({ length: 150 }).notNull(),
    code: varchar({ length: 6 }).notNull().unique(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
    cityId: integer()
      .references(() => city.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => [
    index("airport_idx").on(table.name),
    uniqueIndex("code_idx").on(table.code),
  ]
);

export const airportRelation = relations(airport, ({ one }) => ({
  airportInfo: one(city, {
    fields: [airport.cityId],
    references: [city.id],
  }),
}));

export const cityRelation = relations(city, ({ many }) => ({
  cityInfo: many(airport),
}));
