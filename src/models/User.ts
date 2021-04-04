import { Document, Model, model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import redisService from "../services/redis";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  generateJWT(): { token: string; refresToken: string };
  checkUserPass: (passwordToCheck: string) => boolean;
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

UserSchema.methods.generateJWT = function generateJWT(this: User) {
  const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY!, {
    expiresIn: 3600,
  });

  const refreshToken = jwt.sign({ _id: this._id }, process.env.REFRESH_KEY!);
  redisService.saveRefreshTokenRedis(refreshToken);

  return { token, refreshToken };
};

UserSchema.methods.checkUserPass = function checkUserPass(
  this: User,
  passwordToCheck: string
) {
  return compareSync(passwordToCheck, this.password);
};

UserSchema.pre("save", function beforeSave(this: User) {
  const salt = genSaltSync(10);
  this.password = hashSync(this.password, salt);
});

export default model<User, Model<User>>("User", UserSchema);
