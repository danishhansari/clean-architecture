import { PgTable } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, eq } from "drizzle-orm";
import { db } from "../db";

export class CrudRepository<
  TModel extends PgTable,
  TQuery extends {
    findMany: () => Promise<InferSelectModel<TModel>[]>;
    findFirst: (args: {
      where: () => ReturnType<typeof eq>;
    }) => Promise<InferSelectModel<TModel> | undefined>;
  },
  TIdColumn extends TModel["_"]["columns"][keyof TModel["_"]["columns"]]
> {
  constructor(
    private model: TModel,
    private query: TQuery,
    private idColumn: TIdColumn
  ) {}

  async create(data: InferInsertModel<TModel>) {
    return db.insert(this.model).values(data).returning();
  }

  async delete(id: number | string) {
    return db.delete(this.model).where(eq(this.idColumn, id)).returning();
  }

  async getAll(): Promise<InferSelectModel<TModel>[]> {
    return this.query.findMany();
  }

  async getById(
    id: number | string
  ): Promise<InferSelectModel<TModel> | undefined> {
    return this.query.findFirst({
      where: () => eq(this.idColumn, id),
    });
  }
}
