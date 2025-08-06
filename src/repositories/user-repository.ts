import { db } from "../db";
import { user } from "../db/schema";
import { CrudRepository } from "./crud-repository";

export class UserRepository extends CrudRepository<
  typeof user,
  typeof db.query.user,
  typeof user.id
> {
  constructor() {
    super(user, db.query.user, user.id);
  }
}
