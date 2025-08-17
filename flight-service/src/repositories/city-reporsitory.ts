import { db } from "../db";
import { city } from "../db/schema";
import { CrudRepository } from "./crud-repository";

export class CityRepository extends CrudRepository<
  typeof city,
  typeof db.query.city,
  typeof city.id
> {
  constructor() {
    super(city, db.query.city, city.id);
  }
}
