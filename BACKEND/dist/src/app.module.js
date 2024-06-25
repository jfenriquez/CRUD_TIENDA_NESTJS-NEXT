"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const productos_module_1 = require("./productos/productos.module");
const users_module_1 = require("./users/users.module");
const axios_1 = require("@nestjs/axios");
const database_module_1 = require("./database/database.module");
const config_1 = require("@nestjs/config");
const enviroments_1 = require("./enviroments");
const auth_module_1 = require("./auth/auth.module");
const config_2 = require("./config");
const Joi = require("joi");
const images_module_1 = require("./images/images.module");
const payment_controller_1 = require("./payment/payment.controller");
const payment_service_1 = require("./payment/payment.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            productos_module_1.ProductosModule,
            users_module_1.UsersModule,
            database_module_1.DatabaseModule,
            config_1.ConfigModule.forRoot({
                envFilePath: enviroments_1.enviroments[process.env.NODE_ENV] || '.env',
                load: [config_2.default],
                isGlobal: true,
                validationSchema: Joi.object({
                    API_KEY: Joi.string().required(),
                    DATABASE_NAME: Joi.string().required(),
                }),
            }),
            auth_module_1.AuthModule,
            images_module_1.ImagesModule,
        ],
        controllers: [app_controller_1.AppController, payment_controller_1.PaymentController],
        providers: [
            app_service_1.AppService,
            {
                provide: 'API_KEY',
                useValue: (0, config_2.default)().apiKey,
            },
            {
                provide: 'TASKS',
                useFactory: async (httpService) => {
                    const tasks = await httpService
                        .get('http://jsonplaceholder.typicode.com/todos')
                        .toPromise();
                    return JSON.stringify(tasks.data);
                },
                inject: [axios_1.HttpService],
            },
            payment_service_1.PaymentService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map