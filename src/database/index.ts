import mongoose from "mongoose";
import redis, { ClientOpts, RedisClient } from "redis";
import clientConfig from "../config/redis";
import { MongoMemoryServer } from "mongodb-memory-server";

class Database {
  redisClient: RedisClient;
  mongod: MongoMemoryServer;

  constructor() {
    this.redisClient = this.initRedisDb();
    this.mongod = new MongoMemoryServer();
    this.initMongoDb();
    this.initRedisDb();
  }

  async initMongoDb() {
    const uri =
      process.env.NODE_ENV === "test"
        ? await this.getTestUri()
        : process.env.MONGO_URI!;

    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
      console.log("Sucessfully connected to the database");
    } catch (error) {
      console.log("Erro to connect to database", error);
    }
  }

  initRedisDb() {
    return redis.createClient(clientConfig as ClientOpts);
  }

  async closeDbMongoDB() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongod.stop();
  }
  async clearMongoDb() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }

  async getTestUri() {
    return await this.mongod.getUri();
  }
}

export default new Database();
