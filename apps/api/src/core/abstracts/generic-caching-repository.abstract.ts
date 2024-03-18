export abstract class IGenericCachingRepository<Entity> {
	abstract get(id: string): Promise<Entity>;
	abstract set(id: string, entity: Entity): Promise<void>;
	abstract constructKey(id: string): string;
}
