import { Document, Model, model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { hashSync, genSaltSync } from "bcrypt";
import redisService from "../services/redis";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  generateJWT(): { token: string; refresToken: string };
}

const UserSchema = new Schema<User, Model<User>>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);

UserSchema.methods.generateJWT = function (this: User) {
  const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY!, {
    expiresIn: "3600s",
  });

  const refreshToken = jwt.sign({ _id: this._id }, process.env.REFRESH_KEY!);
  redisService.saveRefreshTokenRedis(refreshToken);

  return { token, refreshToken };
};

UserSchema.pre("save", function (this: User) {
  const salt = genSaltSync(8000);
  this.password = hashSync(this.password, salt);
});

export default model<User, Model<User>>("User", UserSchema);