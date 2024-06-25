import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateImageDto {
  @IsString()
  @ApiProperty()
  readonly originalname: string;

  @IsString()
  @ApiProperty()
  readonly filename: string;
  @IsString()
  @ApiProperty()
  readonly path: string;

  @IsString()
  @ApiProperty()
  readonly secure_url: string;

  @IsString()
  @ApiProperty()
  readonly public_id: string;

  readonly fecha_creacion: Date;
}
