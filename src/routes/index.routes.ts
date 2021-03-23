import { Express } from "express";
import gameRoutes from "./games.routes";

export default function setRoutes(app: Express): void {
  app.use("/api", [gameRoutes]);
}
