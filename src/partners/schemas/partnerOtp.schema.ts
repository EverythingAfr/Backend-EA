import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PartnerOtpDocument = HydratedDocument<PartnerOtp>;

@Schema()
export class PartnerOtp{
    @Prop({ unique: true, required: true, default: () => new Types.ObjectId().toString() })
    id: string;

    @Prop({ required: true })
    userId: string;
    
    @Prop({ required: true })
    otpId: string;
    
    @Prop({ required: true })
    otp: string;
    
    @Prop({ required: true })
    otpUsed: boolean;
}

export const PartnerOtpSchema = SchemaFactory.createForClass(PartnerOtp); 