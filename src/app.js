import express from "express";
import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

import "./database";
import "./services/firebase";
import setRoutes from "./routes/index.routes";

class App {
  constructor() {
    this.app = express();
    this.init();
  }

  init() {
    setRoutes(this.app);
  }
}

export default new App().app;
