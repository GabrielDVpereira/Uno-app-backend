import gameRoutes from "./games.routes";

export default function setRoutes(app) {
  app.use("/api", [gameRoutes]);
}
