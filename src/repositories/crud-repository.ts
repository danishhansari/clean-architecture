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

  create = async (data: InferInsertModel<TModel>) => {
    return await db.insert(this.model).values(data).returning();
  };

  delete = async (id: number | string) => {
    const [response] = await db
      .delete(this.model)
      .where(eq(this.idColumn, id))
      .returning();
    if (!response) {
      throw new AppError(
        "Not able to delete this resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  };

  update = async (
    id: number | string,
    data: Partial<InferInsertModel<TModel>>
  ) => {
    const [response] = await db
      .update(this.model)
      .set(data)
      .where(eq(this.idColumn, id))
      .returning();

    if (!response) {
      throw new AppError(
        "Not able to update this resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  };

  getAll = async (): Promise<InferSelectModel<TModel>[]> => {
    return await this.query.findMany();
  };

  getById = async (id: number | string): Promise<InferSelectModel<TModel>> => {
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
  };
}
