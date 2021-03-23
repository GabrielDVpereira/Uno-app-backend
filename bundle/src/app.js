"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
require("./database");
var index_routes_1 = __importDefault(require("./routes/index.routes"));
dotenv_1.default.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.init();
    }
    App.prototype.init = function () {
        this.app.use(express_1.default.json());
        index_routes_1.default(this.app);
    };
    return App;
}());
exports.default = new App().app;
