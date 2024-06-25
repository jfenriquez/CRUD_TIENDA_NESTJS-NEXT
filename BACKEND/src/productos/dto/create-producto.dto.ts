import { IsString, IsNotEmpty, IsDate, IsUrl, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly descripcion: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly imagen: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly precio: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  readonly fechaCreacion: Date;

  @IsString()
  @ApiProperty()
  readonly marca: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriaId: number;
}
