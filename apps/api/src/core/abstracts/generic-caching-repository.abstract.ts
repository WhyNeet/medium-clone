export abstract class IGenericCachingRepository<Entity> {
	abstract get(id: string): Promise<Entity>;
	abstract set(id: string, entity: Entity): Promise<void>;
	abstract hStore(id: string, entity: Entity): Promise<void>;
	abstract hSet(id: string, key: string, value: string | number): Promise<void>;
	abstract hSetMany(
		id: string,
		object: Record<string, string | number>,
	): Promise<void>;
	abstract hGet<T>(id: string, key: string): Promise<T>;
	abstract exists(id: string): Promise<boolean>;
	abstract constructKey(id: string): string;
}
