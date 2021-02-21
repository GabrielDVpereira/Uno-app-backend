import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

class Database {
  constructor() {
    this.init();
  }

  async init() {
    const uri =
      process.env.NODE_ENV === "test"
        ? this.getTestUri()
        : process.env.MONGO_URI;
    console.log(uri);
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

  async getTestUri() {
    const mongod = new MongoMemoryServer();
    return await mongod.getUri();
  }
}

export default new Database();
