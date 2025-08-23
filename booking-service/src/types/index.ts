import { db } from "../db";

type DbClient = typeof db;
export type Txn = Parameters<Parameters<DbClient["transaction"]>[0]>[0];
