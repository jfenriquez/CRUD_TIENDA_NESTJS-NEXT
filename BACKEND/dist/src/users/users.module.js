"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./services/users.service");
const users_controller_1 = require("./controllers/users.controller");
const productos_module_1 = require("../productos/productos.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const order_entity_1 = require("./entities/order.entity");
const orderProduct_entity_1 = require("./entities/orderProduct.entity");
const orders_service_1 = require("./services/orders.service");
const orders_controller_1 = require("./controllers/orders.controller");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, order_entity_1.Order, orderProduct_entity_1.OrderProduct]),
            productos_module_1.ProductosModule,
        ],
        controllers: [users_controller_1.UsersController, orders_controller_1.OrdersController],
        providers: [users_service_1.UsersService, orders_service_1.OrdersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map