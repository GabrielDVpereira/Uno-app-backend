import request from "supertest";
import app from "../../src/app";
import db from "../../src/database";
import User from "../../src/models/User";

describe("Auth Test Suits", () => {
  afterEach(async () => db.clearMongoDb());
  afterAll(async () => db.closeDbMongoDB());

  it("should create a new user", async () => {
    const response = await request(app).post("/api/auth/create").send({
      name: "test",
      email: "test@test.com",
      password: "123test",
    });
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("refreshToken");
  });

  it("should not create a user with a repeated email", async () => {
    await User.create({
      name: "test",
      email: "test@test.com",
      password: "123test",
    });

    const response = await request(app).post("/api/auth/create").send({
      name: "test",
      email: "test@test.com",
      password: "123test",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email alredy used by another user");
  });

  it("should authenticate a user", async () => {
    await User.create({
      name: "test",
      email: "test@test.com",
      password: "123test",
    });

    const response = await request(app).post("/api/auth").send({
      email: "test@test.com",
      password: "123test",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("refreshToken");
  });

  it("should not authenticate a user with a invalid email", async () => {
    await User.create({
      name: "test",
      email: "test@test.com",
      password: "123test",
    });

    const response = await request(app).post("/api/auth").send({
      email: "test-wrong@test.com",
      password: "123test",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("User email doesn't exist");
  });

  it("should not authenticate a user with a invalid password", async () => {
    await User.create({
      name: "test",
      email: "test@test.com",
      password: "123test",
    });

    const response = await request(app).post("/api/auth").send({
      email: "test@test.com",
      password: "123test-wrong",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Password is invalid");
  });

  it("should refresh the user token", async () => {
    const user = await request(app).post("/api/auth/create").send({
      name: "test",
      email: "test@test.com",
      password: "123test",
    });

    expect(user.body).toHaveProperty("refreshToken");

    const token = await request(app).post("/api/auth/token").send({
      refreshToken: user.body.refreshToken,
    });

    expect(token.status).toBe(200);
    expect(token.body).toHaveProperty("token");
  });

  it("should not refresh the user token when refreshToken is not provided", async () => {
    const token = await request(app).post("/api/auth/token").send({
      refreshToken: null,
    });

    expect(token.status).toBe(400);
    expect(token.body.message).toBe("refresh token not provided");
  });

  it("should not refresh the user token when invalid token is provided", async () => {
    const user = await request(app).post("/api/auth/create").send({
      name: "test",
      email: "test@test.com",
      password: "123test",
    });

    expect(user.body).toHaveProperty("refreshToken");

    const token = await request(app).post("/api/auth/token").send({
      refreshToken: "####",
    });

    expect(token.status).toBe(400);
    expect(token.body.message).toBe("refresh token invalid");
  });
});
