"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = require("bcrypt");
var redis_1 = __importDefault(require("../services/redis"));
var UserSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    collection: "user",
});
UserSchema.methods.generateJWT = function generateJWT() {
    var token = jsonwebtoken_1.default.sign({ _id: this._id }, process.env.PRIVATE_KEY, {
        expiresIn: "3600s",
    });
    var refreshToken = jsonwebtoken_1.default.sign({ _id: this._id }, process.env.REFRESH_KEY);
    redis_1.default.saveRefreshTokenRedis(refreshToken);
    return { token: token, refreshToken: refreshToken };
};
UserSchema.pre("save", function beforeSave() {
    var salt = bcrypt_1.genSaltSync(8000);
    this.password = bcrypt_1.hashSync(this.password, salt);
});
exports.default = mongoose_1.model("User", UserSchema);
