import { BaseContext, ParameterizedContext } from "koa";
import logger from "./logger";

export async function json(
    ctx: BaseContext,
    next: () => Promise<any>
): Promise<void> {
    await next();
    if (typeof ctx.body === "object") {
        logger.debug("Converting body to JSON");

        try {
            ctx.body = JSON.stringify(ctx.body);
            ctx.set("Content-Type", "application/json");
        } catch {
            ctx.status = 500;
        }
    }
}

export async function id(
    ctx: ParameterizedContext,
    next: () => Promise<any>
): Promise<void> {
    logger.debug("Parsing ID");

    const id = parseInt(ctx.params.id);
    if (isNaN(id)) {
        await next();
        ctx.status = 400;
        ctx.body = ctx.message;
        return;
    }

    ctx.params.id = id;
    await next();
}

export async function log(
    ctx: ParameterizedContext,
    next: () => Promise<any>
): Promise<void> {
    logger.debug(`${ctx.method} ${ctx.path}`);
    await next();
}
