import Game from "../models/Game";
import { Request, Response } from "express";

class GameController {
  async create(req: Request, res: Response) {
    try {
      const game = await Game.create(req.body);
      return res.json(game);
    } catch (error) {
      return res.status(400).json({
        message: "Error to create a game",
        error: error.message || error,
      });
    }
  }
}

export default new GameController();
