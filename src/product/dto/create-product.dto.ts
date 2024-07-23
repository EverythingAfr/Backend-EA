import {
    IsString,
    IsNumber,
    IsPositive,
    IsOptional,
    IsArray,
    IsUrl,
    ValidateNested,
    IsBoolean,
    IsEmail,
    IsPhoneNumber
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  // Partner DTO
  class PartnerDTO {
    @IsString()
    sellerId: string;
  
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsPhoneNumber(null)
    phoneNumber: string;
  }
  
  // Product Image DTO
  class ProductImageDto {
    @IsString()
    id: string;
  
    @IsUrl()
    url: string;
  
    @IsString()
    altText: string;
  }
  
  // Product Category DTO
  class ProductCategoryDto {
    @IsString()
    categoryId: string;
  
    @IsString()
    name: string;
  }
  
  // Product DTO
  export class CreateProductDto {
    @IsString()
    productId: string;
    
    @IsString()
    productType: string;
  
    @IsString()
    productName: string;
  
    @IsString()
    productDescription: string;
  
    @IsPositive()
    price: number;
  
    @IsNumber()
    stock: number;
  
    @IsBoolean()
    isAvailable: boolean;

    @IsBoolean()
    isPublished: boolean;
  
    @ValidateNested()
    @Type(() => PartnerDTO)
    partner: PartnerDTO;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductImageDto)
    images: ProductImageDto[];
  
    @ValidateNested()
    @Type(() => ProductCategoryDto)
    categories: ProductCategoryDto;
  
    @IsNumber()
    @IsOptional()
    weight?: number;
  }
  