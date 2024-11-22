import { injectable } from "inversify";
import config from "../config/index";
import { RedisConnection } from "../infra/redis";
import { randomInt } from "crypto";
import { NotFound } from "./err/NotFound";

@injectable()
export class linkService {
  constructor(
    private readonly redis: RedisConnection ) {}

  async postLink(link: string) {
    const generateId = randomInt(100000, 999999);
    await this.redis.query().set(`${generateId}`, link);
    return `http://localhost:${config.server.port}/link/?id=${generateId}`
  }

  async getLink(id: number) {
    const findURL = await this.redis.query().get(`${id}`);
    if (findURL) {
      return findURL;
    } else {
        throw new NotFound();
    }
  }
}
