import { MaxLength } from "class-validator";

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