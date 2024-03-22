import {
	IsArray,
	IsNumber,
	IsString,
	Min,
	ValidateNested,
} from "class-validator";
import { Types } from "mongoose";
import { User } from "./user.entity";

export class Story {
	id: string;

	title: string;

	subtitle: string;

	content: Map<string, StoryContentBlock>;

	author: Types.ObjectId | User | undefined;

	createdAt?: Date;
	updatedAt?: Date;
}

export class StoryContentBlock {
	@IsNumber(
		{ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
		{ message: "must be a number" },
	)
	type: StoryContentBlockType;

	@IsString({ message: "must be a string" })
	text: string;

	@IsArray({ message: "must be an array" })
	@ValidateNested()
	markups: StoryContentBlockMarkup[];

	@IsNumber(
		{ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
		{ message: "must be a number" },
	)
	@Min(0, { message: "block index must be equal or greater than 0" })
	index: number;
}

export class StoryDeltasContentBlock {
	@IsString({ message: "must be a string." })
	id: string;

	@IsNumber(
		{ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
		{ message: "must be a number" },
	)
	type: StoryContentBlockType;

	@IsString({ message: "must be a string" })
	text: string;

	@IsArray({ message: "must be an array" })
	@ValidateNested()
	markups: StoryContentBlockMarkup[];

	@IsNumber(
		{ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
		{ message: "must be a number" },
	)
	@Min(0, { message: "block index must be equal or greater than 0" })
	index: number;
}

export enum StoryContentBlockType {
	Paragraph = 1,
}

export class StoryContentBlockMarkup {
	@IsNumber(
		{ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
		{ message: "must be a number" },
	)
	@Min(0, { message: "must be greater than zero" })
	start: number;

	@IsNumber(
		{ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
		{ message: "must be a number" },
	)
	@Min(0, { message: "must be greater than zero" })
	end: number;

	@IsNumber(
		{ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
		{ message: "must be a number" },
	)
	type: StoryContentBlockMarkupType;
}

export enum StoryContentBlockMarkupType {
	Bold = 1,
	Italic = 2,
}
