import { Type } from "class-transformer";
import {
	ArrayMinSize,
	IsArray,
	IsNumber,
	MaxLength,
	ValidateNested,
} from "class-validator";
import { StoryDeltasContentBlock } from "../entities/story.entity";

export class UpdateStoryDto {
	@MaxLength(512, { message: "must be at most 512 characters long" })
	title: string;

	@MaxLength(1024, { message: "must be at most 512 characters long" })
	subtitle: string;
}

export class StoryDto {
	id: string;

	title: string;

	subtitle: string;

	content: string;

	createdAt: string;
	updatedAt: string;
}

export class StoryDeltasDto {
	@IsArray({ message: "must be an array" })
	@ArrayMinSize(1, { message: "must contain at least one delta" })
	@ValidateNested({ each: true })
	@Type(() => StoryDelta)
	deltas: StoryDelta[];
}

export class StoryDelta {
	@ValidateNested()
	@Type(() => StoryDeltasContentBlock)
	block: StoryDeltasContentBlock;

	@IsNumber(
		{ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
		{ message: "must be a number" },
	)
	type: StoryDeltaType;
}

export enum StoryDeltaType {
	Create = 1,
	Update = 2,
	Delete = 3,
}
