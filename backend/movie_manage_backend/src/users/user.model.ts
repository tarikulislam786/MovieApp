import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User {
    @Prop({unique:true})
    username: String;

    @Prop({unique:true})
    email: String;

    @Prop()
    password: String;
}
export type UserModel = User & Document;
export const UserSchema = SchemaFactory.createForClass(User)