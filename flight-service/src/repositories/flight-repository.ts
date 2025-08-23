import { and, between, eq, gte, sql, SQL } from "drizzle-orm";
import { db } from "../db";
import { flight } from "../db/schema";
import { CrudRepository } from "./crud-repository";
import { FlightFiltersType } from "../types";
import { lockRow } from "./queries";

export class FlightRepository extends CrudRepository<
  typeof flight,
  typeof db.query.flight,
  typeof flight.id
> {
  constructor() {
    super(flight, db.query.flight, flight.id);
  }

  getFlightById = async (id: number) => {
    const response = await db.query.flight.findFirst({
      where: eq(flight.id, id),
      with: {
        airplaneDetails: true,
        departureAirportDetails: {
          with: {
            airportDetails: {
              with: {
                cityDetails: true,
              },
            },
          },
        },
        arrivalAirportDetails: {
          with: {
            airportDetails: {
              with: {
                cityDetails: true,
              },
            },
          },
        },
      },
    });

    return response;
  };

  getAllFlights = async (filters: FlightFiltersType) => {
    const conditions: SQL[] = [];

    if (filters.departureAirportId) {
      conditions.push(
        eq(flight.departureAirportId, filters.departureAirportId)
      );
    }
    if (filters.arrivalAirportId) {
      conditions.push(eq(flight.arrivalAirportId, filters.arrivalAirportId));
    }

    if (filters.price && filters.minPrice && filters.maxPrice) {
      conditions.push(
        between(flight.price, filters.minPrice, filters.maxPrice)
      );
    }
    if (filters.totalSeats) {
      conditions.push(gte(flight.totalSeats, filters.totalSeats));
    }

    const response = await db.query.flight.findMany({
      where: conditions.length ? and(...conditions) : undefined,
      with: {
        airplaneDetails: true,
        departureAirportDetails: {
          with: {
            airportDetails: {
              with: {
                cityDetails: true,
              },
            },
          },
        },
        arrivalAirportDetails: {
          with: {
            airportDetails: {
              with: {
                cityDetails: true,
              },
            },
          },
        },
      },
    });

    return response;
  };

  updateRemainingSeats = async (
    flightId: number,
    count: number,
    decrease = true
  ) => {
    const response = await db.transaction(async (txn) => {
      await txn.execute(lockRow(flightId, flight, flight.id));

      const [updateSeat] = await txn
        .update(flight)
        .set({
          totalSeats: sql`${flight.totalSeats} ${sql.raw(
            decrease ? "-" : "+"
          )} ${count}`,
        })
        .where(eq(flight.id, flightId))
        .returning();
      return updateSeat;
    });

    return response;
  };
}
