import express from "express";
import GameController from "../controllers/Game";

const routes = express.Router();

routes.post("/games", GameController.create);

export default routes;
