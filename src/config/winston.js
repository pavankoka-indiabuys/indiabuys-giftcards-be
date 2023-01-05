import winston from 'winston'

const logger = new winston.createLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true,
        }),
    ],
})

export default logger
