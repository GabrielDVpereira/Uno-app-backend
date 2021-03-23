import express, { Express } from "express";

import "./config/env";
// import "./database";
import setRoutes from "./routes/index.routes";

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.init();
  }

  init() {
    this.app.use(express.json());
    setRoutes(this.app);
  }
}

export default new App().app;
