import { IsString, IsNotEmpty, IsDate, IsUrl, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateCategoriaDto {
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly estado: boolean;

  readonly fecha_creacion: Date;
}
