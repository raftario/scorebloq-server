import "reflect-metadata";
import Koa from "koa";
import Logger from "./logger";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";

const logger = new Logger();

createConnection({
    type: "postgres",
    database: "scorebloq",
    entities: ["models/*.ts"],
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
