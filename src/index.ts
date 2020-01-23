import "reflect-metadata";
import Koa from "koa";
import Logger from "./logger";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";

createConnection({
    type: "postgres",
    database: "scorebloq",
    synchronize: true,
    logging: true,
    logger: new Logger(),
})
    .then(async () => {
        const app = new Koa();
        app.use(bodyParser());

        app.listen(8080);
    })
    .catch(console.error);
