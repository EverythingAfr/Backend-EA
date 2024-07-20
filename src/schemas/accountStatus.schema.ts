import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AccountStatus {
  @Prop({ required: false })
  isActive?: boolean;

  @Prop({ required: false })
  isVerified?: boolean;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;
}

export const AccountStatusSchema = SchemaFactory.createForClass(AccountStatus);