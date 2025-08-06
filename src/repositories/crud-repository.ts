import { PgTable } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, eq } from "drizzle-orm";
import { db } from "../db";
import { logger } from "../utils";

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
    try {
      return db.insert(this.model).values(data).returning();
    } catch (error) {
      logger.error("CrudRepository: create failed", error);
      throw error;
    }
  }

  async delete(id: number | string) {
    try {
      return db.delete(this.model).where(eq(this.idColumn, id)).returning();
    } catch (error) {
      logger.error("CrudRepository: delete failed", error);
      throw error;
    }
  }

  async getAll(): Promise<InferSelectModel<TModel>[]> {
    try {
      const response = this.query.findMany();
      return response;
    } catch (error) {
      logger.error("CrudRepository: getAll failed", error);
      throw error;
    }
  }

  async getById(
    id: number | string
  ): Promise<InferSelectModel<TModel> | undefined> {
    try {
      const response = this.query.findFirst({
        where: () => eq(this.idColumn, id),
      });
      return response;
    } catch (error) {
      logger.error("CrudRepository: getById failed", error);
      throw error;
    }
  }
}
