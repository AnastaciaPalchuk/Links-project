import { Context } from "koa";
import { injectable } from "inversify";
import { linkService } from "./linkService";

@injectable()
export class linkController {
  constructor(private readonly service: linkService) {}

  postLink = async (ctx: Context) => {
    const body = ctx.request.body as { link: string };
    try {
      const backendLink = await this.service.postLink(body.link);
      ctx.body = { link: backendLink };
    } catch (err: any) {
      ctx.status = 500;
      ctx.body = err.message;
      return;
    }
  };

  getLink = async (ctx: Context) => {
    const body = ctx.query as { id: string};
    try {
      const userLink = await this.service.getLink(body.id);
      ctx.status = 302;
      ctx.redirect(userLink)
      ctx.body = "Redirecting...";
    } catch (err: any) {
      ctx.status = 500;
      ctx.body = err.message;
      return;
    }
  };
}
