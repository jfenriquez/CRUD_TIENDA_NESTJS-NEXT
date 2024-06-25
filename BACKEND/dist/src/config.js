"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('config', () => ({
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
    postgres: {
        User: process.env.DB_USR,
        dbHost: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
        dbPassword: process.env.DB_PASSWORD,
        dbPort: parseInt(process.env.DB_PORT, 10) || 5432,
    },
    jwtSecret: process.env.JWT_SECRET,
    emailUser: process.env.EMAIL,
    emailPassword: process.env.PASS_EMAIL,
    apiKey: process.env.API_KEY,
    tasks: process.env.TASKS,
    LINK_FRONTEND: process.env.LINK_FRONTEND,
    LINK_FRONTEN_RECOVERY: process.env.LINK_FRONTEND_RECOVERY,
    cloudinaryConfig: {
        cloudName: process.env.cloud_name,
        apiKey_cloudinary: process.env.api_key_cloudinary,
        apiSecret: process.env.api_secret,
    },
    Mercadopago: {
        MERCADOPAGO_API_KEY: process.env.MERCADOPAGO_API_KEY,
    },
}));
//# sourceMappingURL=config.js.map