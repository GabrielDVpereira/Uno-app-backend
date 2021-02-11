import express from "express";
import "dotenv/config";
import "./database";

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
