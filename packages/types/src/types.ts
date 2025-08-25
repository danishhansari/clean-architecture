import { db } from "@repo/db";

type DbClient = typeof db;
export type Txn = Parameters<Parameters<DbClient["transaction"]>[0]>[0];

export interface baseResponse {
  success: boolean;
  message: string;
  error: Record<string, unknown>;
  data: Record<string, unknown>;
}

export interface FlightFiltersType {
  departureAirportId?: string;
  arrivalAirportId?: string;
  minPrice?: number;
  maxPrice?: number;
  totalSeats?: number;
  startDate?: Date;
  endDate?: Date;
  tripDate?: string | number;
  price?: number;
}

export interface UpdateSeatsType {
  flightId: number;
  seats: number;
  decrement: boolean;
}
