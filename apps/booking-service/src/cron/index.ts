import cron from "node-cron";
import { BookingService } from "../services";

const cronJobs = () => {
  cron.schedule("*/10 * * * *", async () => {
    await BookingService.cancelOldBooking();
  });
};

export { cronJobs };
