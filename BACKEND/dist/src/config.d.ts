declare const _default: (() => {
    database: {
        host: string;
        port: number;
    };
    postgres: {
        User: string;
        dbHost: string;
        dbName: string;
        dbPassword: string;
        dbPort: number;
    };
    jwtSecret: string;
    emailUser: string;
    emailPassword: string;
    apiKey: string;
    tasks: string;
    LINK_FRONTEND: string;
    LINK_FRONTEN_RECOVERY: string;
    cloudinaryConfig: {
        cloudName: string;
        apiKey_cloudinary: string;
        apiSecret: string;
    };
    Mercadopago: {
        MERCADOPAGO_API_KEY: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    database: {
        host: string;
        port: number;
    };
    postgres: {
        User: string;
        dbHost: string;
        dbName: string;
        dbPassword: string;
        dbPort: number;
    };
    jwtSecret: string;
    emailUser: string;
    emailPassword: string;
    apiKey: string;
    tasks: string;
    LINK_FRONTEND: string;
    LINK_FRONTEN_RECOVERY: string;
    cloudinaryConfig: {
        cloudName: string;
        apiKey_cloudinary: string;
        apiSecret: string;
    };
    Mercadopago: {
        MERCADOPAGO_API_KEY: string;
    };
}>;
export default _default;
