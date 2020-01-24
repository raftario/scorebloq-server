import { Logger as L4JSLogger, configure, getLogger } from "log4js";
import { Logger as TOLogger } from "typeorm";

configure({
    appenders: {
        stdout: { type: "stdout" },
        file: { type: "file", filename: "scorebloq.log" },
    },
    categories: {
        default: { appenders: ["stdout", "file"], level: "info" },
        prod: { appenders: ["stdout", "file"], level: "info" },
        dev: { appenders: ["stdout", "file"], level: "trace" },
    },
});
const logger = getLogger(
    process.env.NODE_ENV === "production" ? "prod" : "dev"
);

class Logger implements TOLogger {
    private logger: L4JSLogger = logger;

    logQuery(query: string, parameters?: any[]): void {
        this.logger.debug(
            `SQL Query: ${query}${Logger.parametersToString(parameters)}`
        );
    }
    logQueryError(error: string, query: string, parameters?: any[]): void {
        logger.error(
            `Failed SQL Query: ${query}${Logger.parametersToString(parameters)}`
        );
        this.logger.error(error);
    }
    logQuerySlow(time: number, query: string, parameters?: any[]): void {
        logger.warn(
            `Slow SQL Query (${time}): ${query}${Logger.parametersToString(
                parameters
            )}`
        );
    }
    logSchemaBuild(message: string): void {
        this.logger.info(message);
    }
    logMigration(message: string): void {
        logger.info(message);
    }
    log(level: "log" | "info" | "warn", message: any): void {
        switch (level) {
            case "log":
                this.logger.debug(message);
                break;
            case "info":
                this.logger.info(message);
                break;
            case "warn":
                this.logger.warn(message);
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
        this.logger.trace(message);
    }
    debug(message: string): void {
        this.logger.debug(message);
    }
    info(message: string): void {
        this.logger.info(message);
    }
    warn(message: string): void {
        this.logger.warn(message);
    }
    error(message: string): void {
        this.logger.error(message);
    }
    fatal(message: string): void {
        this.logger.fatal(message);
    }
}

export default new Logger();
