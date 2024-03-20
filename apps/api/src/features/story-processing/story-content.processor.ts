import { ICachingServices } from "@/core/abstracts/caching-services.abstract";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { StoryContentDeltas } from "./types/story-content-deltas.interface";

@Processor("StoryContent")
export class StoryContentProcessor {
	constructor(private cachingServices: ICachingServices) {}

	@Process()
	public async resolveDeltas(job: Job<StoryContentDeltas>) {
		const { userId, deltas, storyId } = job.data;

		const storyKey = `${userId}:${storyId}`;

		// the user is not currently editing the story
		if (!(await this.cachingServices.stories.exists(storyKey))) return;

		this.cachingServices.stories.hSetMany(
			storyKey,
			deltas.reduce((acc, val) => {
				acc[val.id] = val;
				return acc;
			}, {}),
		);

		return {};
	}
}
