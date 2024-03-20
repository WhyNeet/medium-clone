import { Types } from "mongoose";
import { User } from "./user.entity";

export class Story {
	id: string;

	title: string;

	subtitle: string;

	// serialized StoryContent
	content: string;

	author: Types.ObjectId | User | undefined;

	createdAt?: Date;
	updatedAt?: Date;
}

export class StoryContent {
	blocks: StoryContentBlock[];
}

export class StoryContentBlock {
	type: StoryContentBlockType;
	id: string;
	text: string;
	markups: StoryContentBlockMarkup[];
}

export enum StoryContentBlockType {
	Paragraph = 1,
}

export class StoryContentBlockMarkup {
	start: number;
	end: number;
	type: StoryContentBlockMarkupType;
}

export enum StoryContentBlockMarkupType {
	Bold = 1,
	Italic = 2,
}
