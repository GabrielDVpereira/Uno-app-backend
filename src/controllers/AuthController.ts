import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import UserModel from "../models/User";
import redisService from "../services/redis";

interface JwtPayload {
  _id: Types.ObjectId;
}

class AuthController {
  async create(req: Request, res: Response) {
    try {
      const isEmailUsed = await UserModel.findOne({ email: req.body.email });

      if (isEmailUsed) {
        throw new Error("Email alredy used by another user");
      }

      const user = await UserModel.create(req.body);

      const authTokens = user.generateJWT();

      return res.json(authTokens);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Could not create a user",
        error: error.stack,
      });
    }
  }

  async auth(req: Request, res: Response) {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        throw new Error("User email doesn't exist");
      }

      const isPassValid = user.checkUserPass(req.body.password);

      if (!isPassValid) {
        throw new Error("Password is invalid");
      }
      const authTokens = user.generateJWT();

      return res.json(authTokens);
    } catch (error) {
      return res.status(401).json({
        message: error.message || "Fail to login the user",
        error: error.stack,
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new Error("refresh token not provided");
      }
      const refreshTokenList = await redisService.getRefreshTokenRedis();

      if (!refreshTokenList.includes(refreshToken)) {
        throw new Error("refresh token invalid");
      }

      const payload = <JwtPayload>(
        jwt.verify(refreshToken, process.env.REFRESH_KEY!)
      );

      const token = jwt.sign({ _id: payload._id }, process.env.PRIVATE_KEY!, {
        expiresIn: 3600,
      });

      return res.json({ token });
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Could not refresh user token",
        error: error.stack,
      });
    }
  }
}

export default new AuthController();
