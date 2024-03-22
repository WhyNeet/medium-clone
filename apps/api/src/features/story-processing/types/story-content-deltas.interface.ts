import { StoryDelta } from "@/core/dtos/story.dto";

export interface StoryContentDeltas {
	userId: string;
	storyId: string;
	deltas: StoryDelta[];
}
