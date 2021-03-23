import { Express } from "express";
import gameRoutes from "./games.routes";
import authRoutes from "./auth.routes";

export default function setRoutes(app: Express): void {
  app.use("/api", [authRoutes, gameRoutes]);
}
