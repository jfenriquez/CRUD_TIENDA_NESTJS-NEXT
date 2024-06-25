"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductoDto = void 0;
const openapi = require("@nestjs/swagger");
const create_producto_dto_1 = require("./create-producto.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdateProductoDto extends (0, swagger_1.PartialType)(create_producto_dto_1.CreateProductoDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateProductoDto = UpdateProductoDto;
//# sourceMappingURL=update-producto.dto.js.map