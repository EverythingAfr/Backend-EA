import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
    @IsOptional()
    @IsString()
    productUrl?: string;
  
    @IsOptional()
    @IsDate()
    productId?: string;
  
    @IsOptional()
    @IsString()
    userId?: string;

    @IsOptional()
    @IsString()
    partnerId?: string;

    @IsOptional()
    @IsString()
    price?: string;

    @IsOptional()
    @IsString()
    productName?: string;

    @IsOptional()
    @IsString()
    quantity?: string;

    @IsOptional()
    @IsString()
    weight?: string;

    @IsOptional()
    @IsString()
    timeCreated?: string;

    @IsOptional()
    @IsDate()
    dateCreated?: Date;

    @IsOptional()
    @IsDate()
    dateUpdated?: Date;

    @IsOptional()
    @IsString()
    shippingMethod?: string;

    @IsOptional()
    @IsString()
    Address?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    stage?: string;

    @IsOptional()
    @IsDate()
    orderCompleted?: Date;
}