import Map, { Difficulty } from "../models/map";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import { id } from "../middlewares";
import jwt from "koa-jwt";

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

interface PostMap {
    hash: string;
    songName: string;
    songSubName: string;
    songAuthorName: string;
    levelAuthorName: string;
    difficulty: Difficulty;
    beatmapCharacteristicName: string;
}

router.post(
    "/",
    jwt({ secret: "secret" }),
    bodyParser({ enableTypes: ["json"] }),
    async (ctx) => {
        const body: PostMap = ctx.request.body;
        const map = new Map();
        Object.assign(map, body);
        await map.save();
        ctx.status = 201;
    }
);

export default router;
