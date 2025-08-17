import { db } from "../db";
import { airport } from "../db/schema";
import { CrudRepository } from "./crud-repository";

export class AirportRepository extends CrudRepository<
  typeof airport,
  typeof db.query.airport,
  typeof airport.id
> {
  constructor() {
    super(airport, db.query.airport, airport.id);
  }
}
