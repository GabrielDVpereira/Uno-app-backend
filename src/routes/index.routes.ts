import gameRoutes from "./games.routes";
import { Express } from "express";
export default function setRoutes(app: Express) {
  app.use("/api", [gameRoutes]);
}
