import { and, eq, gte, InferInsertModel, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { flight } from "../db/schema";
import { CrudRepository } from "./crud-repository";

export class FlightRepository extends CrudRepository<
  typeof flight,
  typeof db.query.flight,
  typeof flight.id
> {
  constructor() {
    super(flight, db.query.flight, flight.id);
  }

  getAllFlights = async (
    // filters: Partial<InferInsertModel<typeof flight>>
    filters: any
  ) => {
    // const conditions = Object.entries(filters).map(
    //   ([key, value]) => sql`"${sql.raw(key)}" = ${value}`
    // );
    const conditions = [];

    if (filters.departureAirportId) {
      conditions.push(
        eq(flight.departureAirportId, filters.departureAirportId)
      );
    }
    if (filters.arrivalAirportId) {
      conditions.push(eq(flight.arrivalAirportId, filters.arrivalAirportId));
    }

    if (filters.minPrice != undefined) {
      conditions.push(gte(flight.price, filters.minPrice));
    }

    if (filters.maxPrice != undefined) {
      conditions.push(lte(flight.price, filters.maxPrice));
    }
    if (filters.totalSeats) {
      conditions.push(gte(flight.totalSeats, filters.totalSeats));
    }

    const response = await db.query.flight.findMany({
      where: conditions.length ? and(...conditions) : undefined,
    });

    return response;
  };
}
