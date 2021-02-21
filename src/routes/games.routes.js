import express from "express";

const routes = express.Router();

routes.get("/games", (req, res) => {
  res.send("gamess");
});

export default routes;
