import { Logger as L4JSLogger, configure, getLogger } from "log4js";
import { Logger as TOLogger } from "typeorm";

const logger = getLogger();
logger.level = process.env.NODE_ENV === "production" ? "info" : "trace";
configure({
    appenders: {
        stdout: { type: "stdout" },
        file: { type: "file", filename: "scorebloq.log" },
    },
    categories: {
        default: { appenders: ["stdout", "file"], level: logger.level },
    },
});

export default class Logger implements TOLogger {
    private static logger: L4JSLogger = logger;

    logQuery(query: string, parameters?: any[]): void {
        logger.debug(
            `SQL Query: ${query}${Logger.parametersToString(parameters)}`
        );
    }
    logQueryError(error: string, query: string, parameters?: any[]): void {
        logger.error(
            `Failed SQL Query: ${query}${Logger.parametersToString(parameters)}`
        );
        logger.error(error);
    }
    logQuerySlow(time: number, query: string, parameters?: any[]): void {
        logger.warn(
            `Slow SQL Query (${time}): ${query}${Logger.parametersToString(
                parameters
            )}`
        );
    }
    logSchemaBuild(message: string): void {
        logger.info(message);
    }
    logMigration(message: string): void {
        logger.info(message);
    }
    log(level: "log" | "info" | "warn", message: any): void {
        switch (level) {
            case "log":
                logger.debug(message);
                break;
            case "info":
                logger.info(message);
                break;
            case "warn":
                logger.warn(message);
                break;
            default:
                throw new TypeError("Invalid log level");
        }
    }

    private static parametersToString(parameters?: any[]): string {
        if (!parameters) {
            return "";
        }

        try {
            return ` -- PARAMETERS: ${JSON.stringify(parameters)}`;
        } catch {
            return ` -- PARAMETERS: ${parameters.toString()}`;
        }
    }

    trace(message: string): void {
        logger.trace(message);
    }
    debug(message: string): void {
        logger.debug(message);
    }
    info(message: string): void {
        logger.info(message);
    }
    warn(message: string): void {
        logger.warn(message);
    }
    error(message: string): void {
        logger.error(message);
    }
    fatal(message: string): void {
        logger.fatal(message);
    }
}
