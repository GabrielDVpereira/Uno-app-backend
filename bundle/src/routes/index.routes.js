"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var games_routes_1 = __importDefault(require("./games.routes"));
function setRoutes(app) {
    app.use("/api", [games_routes_1.default]);
}
exports.default = setRoutes;
