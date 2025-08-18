import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class User extends Document {

  @Prop({ required: true, trim: true })
  firstName: string

  @Prop({ required: true, trim: true })
  lastName: string

  @Prop({ required: true, unique: true })
  login: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)