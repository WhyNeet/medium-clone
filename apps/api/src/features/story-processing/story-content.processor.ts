import { StoryDelta, StoryDeltaType } from "@/core/dtos/story.dto";
import { StoryContentBlock } from "@/core/entities/story.entity";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { StoryFactoryService } from "../story/story-factory.service";
import { StoryRepositoryService } from "../story/story-repository.service";
import { StoryContentDeltas } from "./types/story-content-deltas.interface";

@Processor("StoryContent")
export class StoryContentProcessor {
	constructor(
		private storyRepositoryService: StoryRepositoryService,
		private storyFactoryService: StoryFactoryService,
	) {}

	@Process()
	public async resolveDeltas(job: Job<StoryContentDeltas>) {
		const { userId, deltas, storyId } = job.data;

		const { content } = await this.storyRepositoryService.getStoryById(storyId);

		await this.mergeDeltas(content, deltas);

		await this.storyRepositoryService.updateStory(
			storyId,
			this.storyFactoryService.updateStoryContent(content),
		);

		return {};
	}

	/**
	 * Merges deltas with the content in-place
	 * @param content Content of the story from the database
	 * @param deltas Deltas received by client
	 */
	private async mergeDeltas(
		content: Map<string, StoryContentBlock>,
		deltas: StoryDelta[],
	) {
		for (const delta of deltas) {
			const { block, type } = delta;

			switch (type) {
				case StoryDeltaType.Create:
					if (content.get(block.id) !== undefined)
						throw new Error(
							`failed to create: block with id "${block.id}" already exists`,
						);
					content.set(block.id, block);
					break;
				case StoryDeltaType.Update:
					if (!content.get(block.id))
						throw new Error(
							`failed to update: block with id "${block.id}" does not exist`,
						);
					content.set(block.id, {
						markups: block.markups,
						text: block.text,
						...content.get(block.id),
					});
					break;
				case StoryDeltaType.Delete:
					if (!content.get(block.id))
						throw new Error(
							`failed to delete: block with id "${block.id}" does not exist`,
						);
					content.delete(block.id);
					break;
			}
		}
	}
}
