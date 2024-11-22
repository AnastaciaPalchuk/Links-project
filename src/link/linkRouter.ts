import Router from "@koa/router";
import log from "../middleware/log";
import { container } from "../IoC";
import { linkController } from "./linkController";

const controller = container.get(linkController);
const linkRouter = new Router();

linkRouter.post("/", log, controller.postLink);
linkRouter.get("/", log, controller.getLink);

export = linkRouter;
