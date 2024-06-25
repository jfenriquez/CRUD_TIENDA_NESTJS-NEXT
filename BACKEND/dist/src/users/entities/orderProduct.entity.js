"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProduct = void 0;
const openapi = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
const producto_entity_1 = require("../../productos/entities/producto.entity");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
let OrderProduct = class OrderProduct {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, createAt: { required: true, type: () => Date }, quantity: { required: true, type: () => Number }, user_id: { required: true, type: () => require("./user.entity").User }, producto_id: { required: true, type: () => require("../../productos/entities/producto.entity").Producto }, order_id: { required: true, type: () => require("./order.entity").Order }, status: { required: true, type: () => String } };
    }
};
exports.OrderProduct = OrderProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP)',
    }),
    __metadata("design:type", Date)
], OrderProduct.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP)',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.orders),
    __metadata("design:type", user_entity_1.User)
], OrderProduct.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, (producto) => producto),
    __metadata("design:type", producto_entity_1.Producto)
], OrderProduct.prototype, "producto_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, (order) => order.Items),
    __metadata("design:type", order_entity_1.Order)
], OrderProduct.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], OrderProduct.prototype, "status", void 0);
exports.OrderProduct = OrderProduct = __decorate([
    (0, typeorm_1.Entity)()
], OrderProduct);
//# sourceMappingURL=orderProduct.entity.js.map