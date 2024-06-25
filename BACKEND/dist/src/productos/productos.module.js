"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosModule = void 0;
const common_1 = require("@nestjs/common");
const productos_controller_1 = require("./controller/productos.controller");
const categorias_controller_1 = require("./controller/categorias.controller");
const productos_service_1 = require("./services/productos.service");
const categorias_service_1 = require("./services/categorias.service");
const typeorm_1 = require("@nestjs/typeorm");
const categoria_entity_1 = require("./entities/categoria.entity");
const producto_entity_1 = require("./entities/producto.entity");
const platform_express_1 = require("@nestjs/platform-express");
let ProductosModule = class ProductosModule {
};
exports.ProductosModule = ProductosModule;
exports.ProductosModule = ProductosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([categoria_entity_1.Categoria, producto_entity_1.Producto]),
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
        ],
        controllers: [productos_controller_1.ProductosController, categorias_controller_1.CategoriasController],
        providers: [productos_service_1.ProductosService, categorias_service_1.CategoriasService],
        exports: [productos_service_1.ProductosService, categorias_service_1.CategoriasService],
    })
], ProductosModule);
//# sourceMappingURL=productos.module.js.map