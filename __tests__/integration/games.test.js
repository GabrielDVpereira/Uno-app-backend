/* eslint-disable no-undef */

import request from "supertest";
import app from "../../src/app";

describe("GAME TEST SUITS", () => {
  it("should sucessfully create a game", async () => {
    request(app).post("/api/games").send({
      userId: "teste",
    });
  });
});
