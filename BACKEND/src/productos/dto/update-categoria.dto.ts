import { CreateCategoriaDto } from './create-categoria.dto';
import { PartialType } from '@nestjs/swagger';
export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  id: number;
  
}
