import Router from "@koa/router";
import Score from "../models/score";
import bodyParser from "koa-bodyparser";
import { id } from "../middlewares";
import jwt from "koa-jwt";

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

interface PostScore {
    score: number;
    map: number;
}

router.post(
    "/",
    jwt({ secret: "secret" }),
    bodyParser({ enableTypes: ["json"] }),
    async (ctx) => {
        ctx.body = 418;
    }
);

export default router;
