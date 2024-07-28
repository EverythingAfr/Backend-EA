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

export class ValidateOtpDto{
    
    @IsOptional()
    @IsString()
    otpId: string;
    
    @IsOptional()
    @IsEmail()
    otp?: string;
}