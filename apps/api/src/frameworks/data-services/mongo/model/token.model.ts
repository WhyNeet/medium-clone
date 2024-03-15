import { TokenType } from "@/core/entities/token.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TokenDocument = HydratedDocument<Token>;

@Schema({ timestamps: { createdAt: true } })
export class Token {
  id: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: true, type: String })
  type: TokenType;

  @Prop({ required: true, type: Date, expires: 0 })
  expireAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
