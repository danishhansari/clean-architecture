import { db, airport } from "@repo/db";
import { CrudRepository } from "@repo/commons";

export class AirportRepository extends CrudRepository<
  typeof airport,
  typeof db.query.airport,
  typeof airport.id
> {
  constructor() {
    super(airport, db.query.airport, airport.id);
  }
}
