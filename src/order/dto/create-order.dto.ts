import { IsString, IsEmail, IsPhoneNumber, IsObject, IsArray, ValidateNested, IsNumber, IsPositive, IsOptional, IsISO8601, IsEnum, IsUrl, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

// Enum for Order Status
enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
}

// Address DTO
class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipCode: string;

  @IsString()
  country: string;
}

// Customer DTO
class CustomerDto {
  @IsString()
  customerId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber(null)
  phoneNumber: string;

  @ValidateNested()
  @Type(() => AddressDto)
  shippingAddress: AddressDto;

  @ValidateNested()
  @Type(() => AddressDto)
  billingAddress: AddressDto;
}

// Order Item DTO
class OrderItemDto {
  @IsString()
  productId: string;

  @IsString()
  productName: string;

  @IsPositive()
  quantity: number;

  @IsPositive()
  unitPrice: number;

  @IsPositive()
  totalPrice: number;
}

// Order Total DTO
class OrderTotalDto {
  @IsPositive()
  subTotal: number;

  @IsPositive()
  tax: number;

  @IsPositive()
  shippingCost: number;

  @IsPositive()
  @IsOptional()
  discount?: number;

  @IsPositive()
  grandTotal: number;
}

// Payment Details DTO
class PaymentDetailsDto {
  @IsString()
  paymentMethod: string;

  @IsString()
  paymentStatus: string;

  @IsString()
  transactionId: string;
}

// Shipment Tracking DTO
class ShipmentTrackingDto {
  @IsString()
  carrier: string;

  @IsString()
  trackingNumber: string;

  @IsString()
  trackingUrl: string;
}

// Order DTO
export class CreateOrderDto {
  @IsString()
  orderId: string;

  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ValidateNested()
  @Type(() => OrderTotalDto)
  orderTotal: OrderTotalDto;

  @ValidateNested()
  @Type(() => PaymentDetailsDto)
  paymentDetails: PaymentDetailsDto;

  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @IsDate()
  orderDate: string;

  @IsDate()
  estimatedDeliveryDate: string;

  @ValidateNested()
  @Type(() => ShipmentTrackingDto)
  shipmentTracking: ShipmentTrackingDto;
}
