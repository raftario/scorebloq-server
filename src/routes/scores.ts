import Router from "@koa/router";
import Score from "../models/score";
import { id } from "../middlewares";

const router = new Router();

router.get("/", async (ctx) => {
    const scores = await Score.find();
    ctx.body = scores;
});

router.get("/:id", id, async (ctx) => {
    if (typeof ctx.params.id !== "number") {
        return;
    }

    const user = await Score.findOne(ctx.params.id);
    if (user) {
        ctx.body = user;
    } else {
        ctx.status = 404;
    }
});

export default router;
