import database from "../database";

class RedisService {
  async saveRefreshTokenRedis(refreshToken: string) {
    const refreshTokenList = await this.getRedisByKey("@refreshToken");
    if (refreshTokenList.length) {
      this.setRedisByKey("@refreshToken", [...refreshTokenList, refreshToken]);
    } else {
      this.setRedisByKey("@refreshToken", [refreshToken]);
    }
  }

  async getRefreshTokenRedis() {
    return this.getRedisByKey("@refreshToken");
  }

  getRedisByKey(key: string) {
    return new Promise<Array<string>>((resolve, reject) => {
      database.redisClient.get(key, (err, reply) => {
        if (err) reject(err);
        if (reply) {
          resolve(JSON.parse(reply));
        }
        resolve([]);
      });
    });
  }

  setRedisByKey(key: string, data: Record<string, unknown> | Array<string>) {
    database.redisClient.set(key, JSON.stringify(data), (err, reply) => {
      if (err) console.log(`Error to save the data into redis ${err}`);
      if (reply === "OK") console.log(key, "set to redis");
    });
  }
}

export default new RedisService();
