import { IsEmail, IsNotEmpty, IsString, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty() @IsString() @ApiProperty() readonly nombre: string;
  @IsNotEmpty() @IsString() @ApiProperty() readonly apellido: string;
  @IsNotEmpty() @IsString() @ApiProperty() readonly phone: string;
  @IsNotEmpty() @IsEmail() @ApiProperty() readonly email: string;
  @IsNotEmpty() @IsString() @ApiProperty() readonly password: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly rol: string;
}
