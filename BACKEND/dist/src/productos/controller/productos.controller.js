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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const productos_service_1 = require("../services/productos.service");
const create_producto_dto_1 = require("../dto/create-producto.dto");
const update_producto_dto_1 = require("../dto/update-producto.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_model_1 = require("../../auth/models/roles.model");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
let ProductosController = class ProductosController {
    constructor(productosService) {
        this.productosService = productosService;
    }
    async create(createProductoDto) {
        return this.productosService.create(createProductoDto);
    }
    ordenar(precio) {
        return this.productosService.findAllOrderPrice(precio);
    }
    findAll() {
        return this.productosService.findAll();
    }
    findOne(searchValue) {
        return this.productosService.findOne(searchValue);
    }
    update(id, updateProductoDto) {
        return this.productosService.update(+id, updateProductoDto);
    }
    remove(id) {
        return this.productosService.remove(+id);
    }
};
exports.ProductosController = ProductosController;
__decorate([
    (0, roles_decorator_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear de productos' }),
    openapi.ApiResponse({ status: 201, type: require("../entities/producto.entity").Producto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_producto_dto_1.CreateProductoDto]),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/filtro/:precio'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/producto.entity").Producto] }),
    __param(0, (0, common_1.Param)('precio')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "ordenar", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/producto.entity").Producto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':searchValue'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/producto.entity").Producto] }),
    __param(0, (0, common_1.Param)('searchValue')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/producto.entity").Producto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_producto_dto_1.UpdateProductoDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_model_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "remove", null);
exports.ProductosController = ProductosController = __decorate([
    (0, swagger_1.ApiTags)('productos'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [productos_service_1.ProductosService])
], ProductosController);
//# sourceMappingURL=productos.controller.js.map