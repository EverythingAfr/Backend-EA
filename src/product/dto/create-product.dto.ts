import {
    IsString,
    IsNumber,
    IsPositive,
    IsOptional,
    IsArray,
    IsUrl,
    ValidateNested,
    IsBoolean,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  // Seller DTO
  class SellerDto {
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
    name: string;
  
    @IsString()
    description: string;
  
    @IsPositive()
    price: number;
  
    @IsNumber()
    stock: number;
  
    @IsBoolean()
    isAvailable: boolean;
  
    @ValidateNested()
    @Type(() => SellerDto)
    seller: SellerDto;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductImageDto)
    images: ProductImageDto[];
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductCategoryDto)
    categories: ProductCategoryDto[];
  
    @IsString()
    @IsOptional()
    sku?: string;
  
    @IsNumber()
    @IsOptional()
    weight?: number;
  
    @IsNumber()
    @IsOptional()
    width?: number;
  
    @IsNumber()
    @IsOptional()
    height?: number;
  
    @IsNumber()
    @IsOptional()
    depth?: number;
  }
  