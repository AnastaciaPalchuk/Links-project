import "reflect-metadata";
import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import bodyparser from "koa-bodyparser";
import { RedisConnection } from "./infra/redis";
import config from "./config";
import { container } from "./IoC";
import linkRouter from "./link/linkRouter";



async function main() {
    const router = new Router();
    const app = new Koa();
     
    app.use(cors());
    app.use(bodyparser());
    const redis = container.get(RedisConnection);
    redis.connect();
  
    router.use("/link", linkRouter.routes(), linkRouter.allowedMethods());

  
    app.use(router.routes());
    app.listen(config.server.port, () =>
      console.log(`Started on port ${config.server.port}`)
    );
  }
  main();
  