import { and, asc, between, desc, eq, gte, lte, SQL } from "drizzle-orm";
import { db } from "../db";
import { airplane, flight } from "../db/schema";
import { CrudRepository } from "./crud-repository";
import { FlightFiltersType } from "../types";

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
}
