import { User } from "@/core/entities/user.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type StoryDocument = HydratedDocument<Story>;

@Schema()
export class Story {
	id: string;

	@Prop()
	title: string;

	@Prop()
	subtitle: string;

	@Prop()
	content: string;

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
	author: User;
}

export const StorySchema = SchemaFactory.createForClass(Story);
