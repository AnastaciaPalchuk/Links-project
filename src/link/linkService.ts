import { injectable } from "inversify";
import config from "../config/index";
import { RedisConnection } from "../infra/redis";
import { randomUUID } from "crypto";
import { NotFound } from "./err/NotFound";

@injectable()
export class linkService {
  constructor(private readonly redis: RedisConnection) {}

  async postLink(link: string) {
    const generateId = randomUUID();
    await this.redis.query().set(generateId, link);
    return `http://localhost:${config.server.port}/link/?id=${generateId}`;
  }

  async getLink(id: string) {
    const findURL = await this.redis.query().get(id);
    if (findURL) {
      return findURL;
    } else {
      throw new NotFound();
    }
  }
}
