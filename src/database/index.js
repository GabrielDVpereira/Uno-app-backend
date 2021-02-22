import mongoose from "mongoose";
const { MongoMemoryServer } = require("mongodb-memory-server");

class Database {
  constructor() {
    this.init();
  }

  async init() {
    const uri =
      process.env.NODE_ENV === "test"
        ? await this.getTestUri()
        : process.env.MONGO_URI;

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

  async closeDb() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongod.stop();
  }
  async clearDb() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }

  async getTestUri() {
    this.mongod = new MongoMemoryServer();
    return await this.mongod.getUri();
  }
}

export default new Database();
