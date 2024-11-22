import { Container } from "inversify";
import { RedisConnection } from "./infra/redis";
import { linkController } from "./link/linkController";
import { linkService } from "./link/linkService";

const container = new Container();
container.bind(RedisConnection).toSelf().inSingletonScope();

container.bind(linkController).toSelf().inSingletonScope();
container.bind(linkService).toSelf().inSingletonScope();

export { container };
