import { Context } from "hono";
import { BookingService } from "../services";
import { ErrorResponse, SuccessResponse } from "@repo/commons";
import { StatusCodes } from "http-status-codes";

const inMemoryDb: Record<string, string> = {};
const createBooking = async (c: Context) => {
  try {
    const body = await c.req.json();
    const booking = await BookingService.createBooking({
      flightId: body.flightId,
      userId: body.userId,
      noOfSeats: body.noOfSeats,
      totalCost: body.totalCost,
    });
    SuccessResponse.data = booking;
    c.status(StatusCodes.CREATED);

    return c.json(SuccessResponse);
  } catch (error) {
    // @ts-ignore
    ErrorResponse.error = error;
    //  @ts-ignore
    c.status(error.statusCode);
    return c.json(ErrorResponse);
  }
};

const makeBooking = async (c: Context) => {
  try {
    const idempotentKey = c.req.param("x-idempotent");
    if (!idempotentKey) {
      ErrorResponse.error = "Idempotent key is required";
      c.status(StatusCodes.BAD_REQUEST);
      return c.json(ErrorResponse);
    }
    if (inMemoryDb[idempotentKey]) {
      ErrorResponse.error = "Cannot retry to a successful payment";
      c.status(StatusCodes.BAD_REQUEST);
      return c.json(ErrorResponse);
    }
    const body = await c.req.json();
    const booking = await BookingService.makeBooking({
      userId: body.userId,
      totalCost: body.totalCost,
      bookingId: body.bookingId,
    });
    SuccessResponse.data = booking;
    c.status(StatusCodes.CREATED);

    return c.json(SuccessResponse);
  } catch (error) {
    // @ts-ignore
    ErrorResponse.error = error;
    //  @ts-ignore
    c.status(error.statusCode);
    return c.json(ErrorResponse);
  }
};

export default { createBooking, makeBooking };
