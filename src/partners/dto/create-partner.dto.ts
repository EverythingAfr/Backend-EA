import { Optional } from '@nestjs/common';
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
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

export class PartnerAccountStatusDto {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;
  
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

export class PartnerRepDto {
    @IsOptional()
    @IsString()
    representativeName?: string;
  
    @IsOptional()
    @IsDate()
    representativeEmail?: string;
  
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    alternatePhoneNumber?: string;
}

export class PartnerShippingDto {
    @IsOptional()
    @IsString()
    shippingZone?: string;
  
    @IsOptional()
    @IsDate()
    postCode?: string;
  
    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    cityOrTown?: string;

    @IsOptional()
    @IsString()
    country?: string;
}

export class PartnerPaymentDto {
    @IsOptional()
    @IsString()
    beneficiaryName?: string;
  
    @IsOptional()
    @IsDate()
    beneficiaryAccount?: string;
  
    @IsOptional()
    @IsString()
    sortCode?: string;

    @IsOptional()
    @IsString()
    bankName?: string;
}

export class PartnerBusinessInfoDto {
    @IsOptional()
    @IsString()
    idType?: string;

    @IsOptional()
    @IsString()
    idName?: string;
    
    @IsOptional()
    @IsString()
    idUrl?: string;

    @IsOptional()
    @IsString()
    VATNumber?: string;

    @IsOptional()
    @IsString()
    VATName?: string;
    
    @IsOptional()
    @IsString()
    VATUrl?: string;
    
    @IsOptional()
    @IsString()
    UTRNumber?: string;
    
    @IsOptional()
    @IsString()
    UTRName?: string;
    
    @IsOptional()
    @IsString()
    UTRUrl?: string;
    
    @IsOptional()
    @IsString()
    foodBusinessCert?: string;

    @IsOptional()
    @IsString()
    foodBusinessUrl?: string;
    
    @IsOptional()
    @IsString()
    foodAllergensCert?: string;

    @IsOptional()
    @IsString()
    foodAllergensCertUrl?: string;
    
    @IsOptional()
    @IsString()
    foodHygieneCert?: string;
    
    @IsOptional()
    @IsString()
    foodHygieneCertUrl?: string;
}
  
export class CreatePartnerDto{
    
    @IsOptional()
    @IsString()
    fullName: string;
    
    @IsOptional()
    @IsEmail()
    email?: string;
    
    @IsOptional()
    @IsString()
    city?: string;
    
    @IsOptional()
    @IsString()
    phoneNumber?: string;
    
    @IsOptional()
    @IsString()
    password: string;
    
    @IsOptional()
    @IsString()
    stage: string;

    @IsOptional()
    @IsString()
    accountType: string;

    @IsOptional()
    @IsString()
    productType: string;

    @IsOptional()
    @IsString()
    businessName: string;

    @IsOptional()
    @IsString()
    businessAddress?: string;

    @IsOptional()
    @IsString()
    businessLogo?: string;

    @IsOptional()
    @IsString()
    postCode?: string;

    @IsOptional()
    @IsString()
    cityOrTown?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PartnerAccountStatusDto)
    accountStatus?: PartnerAccountStatusDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => PartnerRepDto)
    partnerRep?: PartnerRepDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => PartnerBusinessInfoDto)
    PartnerBusinessInfo?: PartnerBusinessInfoDto;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => PartnerShippingDto)
    PartnerShipping?: PartnerShippingDto;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => PartnerPaymentDto)
    PartnerPayment?: PartnerPaymentDto;

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => CreateOrderDto)
    orders?: CreateOrderDto[];
}