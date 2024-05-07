const winston = require("winston");
require("dotenv").config(); // Importiere dotenv für das Lesen von Umgebungsvariablen

const logLevel = process.env.LOG_LEVEL || "info"; // Standardmäßig "info", falls LOG_LEVEL nicht definiert ist

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
