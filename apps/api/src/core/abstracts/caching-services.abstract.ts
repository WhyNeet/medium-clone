import { IGenericCachingRepository } from "./generic-caching-repository.abstract";

export abstract class ICachingServices {
	abstract caching: IGenericCachingRepository<unknown>;
}
