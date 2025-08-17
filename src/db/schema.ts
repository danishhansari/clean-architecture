import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { SEAT_TYPE } from "../utils/commons";

export const { BUSINESS, BUSINESS_ECONOMY, ECONOMY, FIRST_CLASS } = SEAT_TYPE;

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
    code: varchar().notNull().unique(),
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

export const flight = pgTable(
  "flight",
  {
    id: serial("id").primaryKey(),
    flightNumber: varchar({ length: 20 }).notNull(),
    airplaneId: integer()
      .notNull()
      .references(() => airplane.id, { onDelete: "cascade" }),
    departureAirportId: varchar()
      .notNull()
      .references(() => airport.code, { onDelete: "cascade" }),
    arrivalAirportId: varchar()
      .notNull()
      .references(() => airport.code, { onDelete: "cascade" }),
    arrivalTime: timestamp({ mode: "date" }).notNull(),
    departureTime: timestamp({ mode: "date" }).notNull(),
    price: integer().notNull(),
    boardingGate: varchar({ length: 50 }),
    totalSeats: integer().notNull(),
  },
  (table) => [index("flightNumber_idx").on(table.flightNumber)]
);

export const typeEnum = pgEnum("typeEnum", [
  BUSINESS,
  BUSINESS_ECONOMY,
  ECONOMY,
  FIRST_CLASS,
]);

export const seats = pgTable("seats", {
  id: serial("id").primaryKey(),
  airplaneId: integer()
    .notNull()
    .references(() => airplane.id, { onDelete: "cascade" }),
  row: integer().notNull(),
  col: varchar().notNull(),
  type: typeEnum().notNull().default(ECONOMY),
});

export const seatsRelation = relations(seats, ({ one }) => ({
  seatsDetails: one(airplane, {
    fields: [seats.airplaneId],
    references: [airplane.id],
  }),
}));

export const airportRelation = relations(airport, ({ one }) => ({
  airportDetails: one(city, {
    fields: [airport.cityId],
    references: [city.id],
  }),
}));

export const cityRelation = relations(city, ({ many }) => ({
  cityDetails: many(airport),
}));

export const flightRelations = relations(flight, ({ one }) => ({
  airplaneDetails: one(airplane, {
    fields: [flight.airplaneId],
    references: [airplane.id],
  }),
  departureAirportDetails: one(airport, {
    fields: [flight.departureAirportId],
    references: [airport.code],
  }),
  arrivalAirportDetails: one(airport, {
    fields: [flight.arrivalAirportId],
    references: [airport.code],
  }),
}));
