import express from "express";
import GameController from "../controllers/GameController";
import authMiddleware from "../middlewares/authorization";

const routes = express.Router();
routes.use(authMiddleware);
routes.post("/games", GameController.create);

export default routes;
