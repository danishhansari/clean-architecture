import { airplane, db } from "@repo/db";
import { CrudRepository } from "@repo/commons";

export class AirplaneRepository extends CrudRepository<
  typeof airplane,
  typeof db.query.airplane,
  typeof airplane.id
> {
  constructor() {
    super(airplane, db.query.airplane, airplane.id);
  }
}
