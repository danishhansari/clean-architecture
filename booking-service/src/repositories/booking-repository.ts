import { and, eq, InferInsertModel, lte, ne, notInArray } from "drizzle-orm";
import { db } from "../db";
import { booking } from "../db/schema";
import { CrudRepository } from "./crud-repository";
import { Txn } from "../types";
import { AppError } from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";
import { STATUS } from "../utils/commons";

export class BookingRepository extends CrudRepository<
  typeof booking,
  typeof db.query.booking,
  typeof booking.id
> {
  constructor() {
    super(booking, db.query.booking, booking.id);
  }

  createTxn = async (data: InferInsertModel<typeof booking>, txn: Txn) => {
    const result = await txn.insert(booking).values(data).returning();
    return result;
  };

  getTxn = async (id: number, txn: Txn) => {
    const response = await txn.query.booking.findFirst({
      where: (booking, { eq }) => eq(booking.id, id),
    });
    return response;
  };

  updateTxn = async (
    id: number,
    data: Partial<InferInsertModel<typeof booking>>,
    txn: Txn
  ) => {
    const [response] = await txn
      .update(booking)
      .set(data)
      .where(eq(booking.id, id))
      .returning();

    if (!response) {
      throw new AppError(
        "Not able to update this resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  };

  cancelOldBookings = async (time: Date) => {
    const response = await db
      .update(booking)
      .set({ status: STATUS.CANCELLED })
      .where(
        and(
          lte(booking.createdAt, time),
          notInArray(booking.status, [STATUS.BOOKED, STATUS.CANCELLED])
        )
      )
      .returning();
    return response;
  };
}
