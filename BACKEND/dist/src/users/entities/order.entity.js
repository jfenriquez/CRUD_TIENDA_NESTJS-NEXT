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
exports.Order = void 0;
const openapi = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const orderProduct_entity_1 = require("./orderProduct.entity");
let Order = class Order {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, user: { required: true, type: () => require("./user.entity").User }, Producto: { required: true, type: () => [require("../../productos/entities/producto.entity").Producto] }, updateAt: { required: true, type: () => Date }, createAt: { required: true, type: () => Date }, user_id: { required: true, type: () => require("./user.entity").User }, Items: { required: true, type: () => [require("./orderProduct.entity").OrderProduct] } };
    }
};
exports.Order = Order;
__decorate([
    (0, typeorm_2.Column)(),
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_2.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP)',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Order.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP)',
    }),
    __metadata("design:type", Date)
], Order.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.orders),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderProduct_entity_1.OrderProduct, (item) => item.order_id),
    __metadata("design:type", Array)
], Order.prototype, "Items", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_2.Entity)()
], Order);
//# sourceMappingURL=order.entity.js.map