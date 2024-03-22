import { Story, StoryContentBlock } from "@/core/entities/story.entity";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class StoryFactoryService {
	public createNewStory(authorId: string): Story {
		const story = new Story();

		story.author = new Types.ObjectId(authorId);
		story.content = new Map();

		return story;
	}

	public updateStoryContent(content: Map<string, StoryContentBlock>): Story {
		const story = new Story();

		story.content = content;

		return story;
	}
}
