import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop({ unique: true, required: true, default: () => new Types.ObjectId().toString() })
    id: string;

    @Prop({ unique: true, required: true })
    username: string;

    @Prop()
    email: string;

    @Prop({required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User); 