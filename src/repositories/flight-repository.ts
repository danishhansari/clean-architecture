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
}
