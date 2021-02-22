/* eslint-disable no-undef */

import request from "supertest";
import app from "../../src/app";
import db from "../../src/database";

describe("GAME TEST SUITS", () => {
  afterEach(async () => await db.clearDb());
  afterAll(async () => await db.closeDb());

  it("should sucessfully create a game", async () => {
    const response = await request(app)
      .post("/api/games")
      .send({
        userId: "teste",
        players: [
          {
            name: "Gabriel",
          },
        ],
        rounds: 1,
      });

    expect(response.body).toHaveProperty("_id");
  });
});
