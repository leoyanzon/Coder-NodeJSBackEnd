const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(process.cwd(), './src/config/development' + '.env')
})

const config = {
    server: {
        ENVIRONMENT: process.env.ENVIRONMENT || 'development',
        HOST: process.env.HOST || 'localhost',
        SERVER_PORT: process.env.SERVER_PORT || 8080,
    },
    cookies: {
        COOKIES_SECRET: process.env.COOKIES_SECRET || 'undefined',
    },
    db: {
        DB_NAME: process.env.DB_NAME || 'undefined',
        SESSION_STORAGE: process.env.SESSION_STORAGE || 'mongoDb',
        MONGO_URI: process.env.MONGO_URI + process.env.DB_NAME|| 'undefined',
        MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL + process.env.DB_NAME || 'undefined',
    },
    logger: {
        PINO_LOG_LEVEL: process.env.PINO_LOG_LEVEL || 'info'
    },
    email:  {
        EMAIL_USER: process.env.EMAIL_USER || 'undefined',
        EMAIL_PASS: process.env.EMAIL_PASS || 'undefined',
    },
    whatsapp: {
        TWILIO_SID: process.env.TWILIO_SID || 'undefined',
        TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || 'undefined',
    },
}

module.exports = config;