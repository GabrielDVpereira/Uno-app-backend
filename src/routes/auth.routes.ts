import express from "express";
import AuthController from "../controllers/AuthController";

const routes = express.Router();
routes.post("/auth", AuthController.auth);
routes.post("/auth/create", AuthController.create);
routes.post("/auth/token", AuthController.refreshToken);

export default routes;
