import { env } from "process";
import * as dotenv from "dotenv";
dotenv.config();

export = {
  server: {
    port: env.WEB_PORT,
  },
  redis: {
    port: Number(env.REDIS_PORT),
    host: env.REDIS_HOST
  }
};
