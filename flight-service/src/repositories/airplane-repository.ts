import { db } from "../db";
import { airplane } from "../db/schema";
import { CrudRepository } from "./crud-repository";

export class AirplaneRepository extends CrudRepository<
  typeof airplane,
  typeof db.query.airplane,
  typeof airplane.id
> {
  constructor() {
    super(airplane, db.query.airplane, airplane.id);
  }
}
