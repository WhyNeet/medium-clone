import { StoryContent } from "../entities/story.entity";
import { IGenericCachingRepository } from "./generic-caching-repository.abstract";

export abstract class ICachingServices {
	abstract stories: IGenericCachingRepository<StoryContent>;
}
