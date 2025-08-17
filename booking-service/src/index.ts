import { Hono } from "hono";
import { allRoutes } from "./routes";

const app = new Hono();

app.basePath("/api").route("/", allRoutes);

export default app;
