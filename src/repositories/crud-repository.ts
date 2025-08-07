import { PgTable } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, eq } from "drizzle-orm";
import { db } from "../db";
import { AppError } from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";

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

  async getById(id: number | string): Promise<InferSelectModel<TModel>> {
    const response = await this.query.findFirst({
      where: () => eq(this.idColumn, id),
    });
    if (!response) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
}
