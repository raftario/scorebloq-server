import "reflect-metadata";
import Koa from "koa";
import Logger from "./logger";
import Map from "./models/map";
import Score from "./models/score";
import User from "./models/user";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";

const logger = new Logger();

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
        app.use(bodyParser());
        app.listen(8080);
    })
    .catch(logger.fatal);
