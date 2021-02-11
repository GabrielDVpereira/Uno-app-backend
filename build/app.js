"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.init();
  }

  init() {
    this.app.use("/", (req, res) => {
      res.send("App is runnig :)");
    });
  }
}

exports. default = new App().app;
