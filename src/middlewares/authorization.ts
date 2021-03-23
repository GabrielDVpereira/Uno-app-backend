/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: { _id: Types.ObjectId };
    }
  }
}

interface JwtPayload {
  _id: Types.ObjectId;
}
export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(403)
        .json({ message: "A authorization header must be provided" });
    }

    const bearer = authorization.split(" ")[0].toLowerCase();
    const token = authorization.split(" ")[1];

    if (bearer !== "bearer") {
      throw new Error("a valid token must be provided ");
    }

    const user = <JwtPayload>jwt.verify(token, process.env.PRIVATE_KEY!);
    req.user = user;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: error.message || "unauhtorized", err: error.stack });
  }
}
