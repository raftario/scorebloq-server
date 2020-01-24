import Router from "@koa/router";
import User from "../models/user";
import { id } from "../middlewares";

const router = new Router();

router.get("/", async (ctx) => {
    const users = await User.find({ loadEagerRelations: false });
    ctx.body = users;
});

router.get("/:id", id, async (ctx) => {
    if (typeof ctx.params.id !== "number") {
        return;
    }

    const user = await User.findOne(ctx.params.id);
    if (user) {
        ctx.body = user;
    } else {
        ctx.status = 404;
    }
});

export default router;
