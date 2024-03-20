import { StoryContentBlock } from "@/core/entities/story.entity";

export interface StoryContentDeltas {
	userId: string;
	storyId: string;
	deltas: StoryContentBlock[];
}
