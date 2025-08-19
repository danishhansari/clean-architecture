import { sql, Table } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

export const lockRow = <
  TTable extends PgTable,
  TIdColumn extends TTable["_"]["columns"][keyof TTable["_"]["columns"]]
>(
  id: number,
  table: TTable,
  column: TIdColumn
) => {
  return sql`SELECT * FROM ${table} WHERE ${column} = ${id} FOR UPDATE`;
};
