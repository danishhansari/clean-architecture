import { Hono } from "hono";
import { allRoutes } from "./routes";
import { cronJobs } from "./utils/commons";

const app = new Hono();

app.basePath("/api").route("/", allRoutes);

export default {
  fetch: app.fetch,
  port: 8080,
};

cronJobs();
