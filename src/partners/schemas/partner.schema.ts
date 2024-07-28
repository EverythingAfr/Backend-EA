import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<Partner>;

@Schema()
export class Partner{
    @Prop({ unique: true, required: true, default: () => new Types.ObjectId().toString() })
    id: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop()
    fullname: string;

    @Prop({required: true})
    password: string;
    
    @Prop({required: true})
    city: string;

    @Prop({required: true})
    phoneNumber: string;
    
    @Prop({required: true})
    role: string;

    @Prop({required: true})
    accountStatus: string
}

export const PartnerSchema = SchemaFactory.createForClass(Partner); 