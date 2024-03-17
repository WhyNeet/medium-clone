import { Story } from "@/core/entities/story.entity";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class StoryFactoryService {
	public createNewStory(authorId: string): Story {
		const story = new Story();

		story.author = new Types.ObjectId(authorId);

		return story;
	}
}
