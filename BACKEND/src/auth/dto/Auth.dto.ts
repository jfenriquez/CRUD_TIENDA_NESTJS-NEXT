import { IsString, IsNotEmpty, IsDate, IsUrl, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
