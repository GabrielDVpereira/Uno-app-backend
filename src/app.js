import express from "express";
import dotenv from "dotenv";
import "./database";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

class App {
  constructor() {
    this.app = express();
    this.init();
  }

  init() {
    this.app.use("/", (req, res) => {
      res.send("App is runnig :)");
    });
  }
}

export default new App().app;
