import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PartnerAccountStatus {
  @Prop({ required: false })
  isActive?: boolean;

  @Prop({ required: false })
  isEmailVerified?: boolean;

  @Prop({ required: false })
  isVerified?: boolean;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;
}

export const PartnerAccountStatusSchema = SchemaFactory.createForClass(PartnerAccountStatus);