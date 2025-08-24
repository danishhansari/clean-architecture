import { city, db } from "@repo/db";
import { CrudRepository } from "@repo/db";

export class CityRepository extends CrudRepository<
  typeof city,
  typeof db.query.city,
  typeof city.id
> {
  constructor() {
    super(city, db.query.city, city.id);
  }
}
