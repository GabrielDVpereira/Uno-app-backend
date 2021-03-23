import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

import "./database";
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
