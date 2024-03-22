import { StoryContentBlock } from "@/core/entities/story.entity";
import { User } from "@/core/entities/user.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type StoryDocument = HydratedDocument<Story>;

@Schema({ timestamps: true })
export class Story {
	id: string;

	// title for previews
	@Prop()
	title: string;

	// subtitle for previews
	@Prop()
	subtitle: string;

	// content includes title and subtitle
	@Prop({ type: MongooseSchema.Types.Map })
	content: Map<string, StoryContentBlock>;

	// short content for previews
	@Prop()
	shortContent: string;

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
	author: User;
}

export const StorySchema = SchemaFactory.createForClass(Story);
