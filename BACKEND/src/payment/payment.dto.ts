import { IsString, IsNotEmpty, IsDate, IsUrl, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class PaymentRequestDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @ApiProperty()
  readonly quantity: number;

  @IsString()
  @ApiProperty()
  readonly currency_id: string;

  @IsNumber()
  @ApiProperty()
  readonly unit_price: number;
}
