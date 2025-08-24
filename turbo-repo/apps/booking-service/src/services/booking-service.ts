import { InferInsertModel } from "drizzle-orm";
import { BookingRepository } from "../repositories";
import { booking } from "@repo/db";
import { db } from "@repo/db";
import { flightServiceUrl, STATUS } from "@repo/commons";
import { AppError } from "@repo/commons";
import { StatusCodes } from "http-status-codes";

const bookingRepo = new BookingRepository();

const createBooking = async (data: InferInsertModel<typeof booking>) => {
  try {
    const result = await db.transaction(async (txn) => {
      const flight = await fetch(
        `${flightServiceUrl}/api/v1/flight/${data.flightId}`
      );
      const response = await flight.json();
      if (!response) {
        throw new AppError("Flight doesn't exists", StatusCodes.NOT_FOUND);
      }
      if (!data.noOfSeats) {
        throw new AppError("Please provide seats", StatusCodes.BAD_REQUEST);
      }
      if (data.noOfSeats > response.data.totalSeats) {
        throw new AppError(
          "No enough seats available",
          StatusCodes.BAD_REQUEST
        );
      }
      const totalBillingAmount = response.data.price * data.noOfSeats;
      const payload = { ...data, totalCost: totalBillingAmount };
      await bookingRepo.createTxn(payload, txn);
      const updateSeats = await fetch(
        `${flightServiceUrl}/api/v1/flight/${data.flightId}/seats`,
        {
          method: "PATCH",
          body: JSON.stringify({ seats: data.noOfSeats }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const seat = await updateSeats.json();
      return seat;
    });
    return result.data;
  } catch (error) {
    // @ts-ignore
    throw new AppError(error.message, error.statusCode);
  }
};

const makeBooking = async (data: {
  userId: number;
  totalCost: number;
  bookingId: number;
}) => {
  try {
    const result = await db.transaction(async (txn) => {
      const bookingDetails = await bookingRepo.getTxn(data.bookingId, txn);
      console.log(bookingDetails);

      if (!bookingDetails) {
        throw new AppError("No booking were found", StatusCodes.BAD_REQUEST);
      }
      if (bookingDetails.status === STATUS.CANCELLED) {
        throw new AppError("The booking has expired", StatusCodes.BAD_REQUEST);
      }
      if (bookingDetails.totalCost !== data.totalCost) {
        throw new AppError(
          "The user corresponding to the booking doesn't match",
          StatusCodes.BAD_REQUEST
        );
      }
      if (bookingDetails.userId !== data.userId) {
        throw new AppError(
          "The user corresponding to the booking doesn't match",
          StatusCodes.BAD_REQUEST
        );
      }
      const bookingTime = new Date(bookingDetails.createdAt);
      const currentTime = new Date();

      const timeDifference = currentTime.getTime() - bookingTime.getTime();

      if (timeDifference > 300000) {
        await cancelBooking(bookingDetails);
        console.log("this is updated");
        throw new AppError("The booking has expired", StatusCodes.BAD_REQUEST);
      }

      const response = await bookingRepo.updateTxn(
        data.bookingId,
        {
          status: STATUS.BOOKED,
        },
        txn
      );
      return response;
    });
    return result;
  } catch (error) {
    // @ts-ignore
    throw new AppError(error.message, error.statusCode);
  }
};

const cancelBooking = async (data: InferInsertModel<typeof booking>) => {
  try {
    if (!data) {
      throw new AppError("Data is invalid", StatusCodes.BAD_REQUEST);
    }
    const response = await db.transaction(async (txn) => {
      if (data.status === STATUS.CANCELLED) {
        return true;
      }
      await fetch(`${flightServiceUrl}/api/v1/flight/${data.flightId}/seats`, {
        method: "PATCH",
        body: JSON.stringify({ seats: data.noOfSeats, decrement: false }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await bookingRepo.updateTxn(
        // @ts-ignore
        data.id,
        {
          status: STATUS.CANCELLED,
        },
        txn
      );
      return result;
    });

    return response;
  } catch (error) {
    // @ts-ignore
    throw new AppError(error.message, error.statusCode);
  }
};

const cancelOldBooking = async () => {
  try {
    const time = new Date(Date.now() - 1000 * 300);
    const response = await bookingRepo.cancelOldBookings(time);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default { createBooking, makeBooking, cancelOldBooking };
