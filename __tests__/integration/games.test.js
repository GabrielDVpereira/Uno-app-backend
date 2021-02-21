/* eslint-disable no-undef */

import request from "supertest";
import app from "../../src/app";

describe("GAME TEST SUITS", () => {
  it("should sucessfully create a game", async () => {
    jest.setTimeout(30000);

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
