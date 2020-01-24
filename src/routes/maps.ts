import Router from "@koa/router";
import Map from "../models/map";
import { id } from "../middlewares";

const router = new Router();

router.get("/", async (ctx) => {
    const maps = await Map.find({ loadEagerRelations: false });
    ctx.body = maps;
});

router.get("/:id", id, async (ctx) => {
    if (typeof ctx.params.id !== "number") {
        return;
    }

    const user = await Map.findOne(ctx.params.id);
    if (user) {
        ctx.body = user;
    } else {
        ctx.status = 404;
    }
});

export default router;
