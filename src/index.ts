import "reflect-metadata";
import { json, log } from "./middlewares";
import Koa from "koa";
import Map from "./models/map";
import Router from "@koa/router";
import Score from "./models/score";
import User from "./models/user";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import logger from "./logger";
import mapsRouter from "./routes/maps";
import scoresRouter from "./routes/scores";
import usersRouter from "./routes/users";

createConnection({
    type: "postgres",
    database: "scorebloq",
    username: "postgres",
    entities: [User, Map, Score],
    synchronize: true,
    logging: true,
    logger,
})
    .then(() => {
        const app = new Koa();

        const router = new Router();
        router
            .use("/maps", mapsRouter.routes(), mapsRouter.allowedMethods())
            .use(
                "/scores",
                scoresRouter.routes(),
                scoresRouter.allowedMethods()
            )
            .use("/users", usersRouter.routes(), usersRouter.allowedMethods());

        app.use(bodyParser())
            .use(log)
            .use(json)
            .use(router.routes())
            .use(router.allowedMethods());

        app.listen(8080);
        logger.info("Listening on port 8080");
    })
    .catch(logger.fatal);
