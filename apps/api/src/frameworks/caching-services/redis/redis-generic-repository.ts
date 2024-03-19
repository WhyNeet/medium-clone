import { IGenericCachingRepository } from "@/core/abstracts/generic-caching-repository.abstract";
import { RedisClientOptions, RedisClientType, createClient } from "redis";

export class RedisGenericRepository<Entity>
	implements IGenericCachingRepository<Entity>
{
	constructor(
		private client: RedisClientType,
		private prefix?: string,
	) {}

	public static async connect<Entity>(
		options: RedisClientOptions,
		prefix?: string,
	): Promise<RedisGenericRepository<Entity>> {
		const client = await createClient(options).connect();

		return new RedisGenericRepository(client as RedisClientType, prefix);
	}

	public async get(id: string): Promise<Entity> {
		return JSON.parse(await this.client.get(this.constructKey(id)));
	}

	public async set(id: string, entity: Entity): Promise<void> {
		const serializedEntity =
			typeof entity === "string" ? entity : JSON.stringify(entity);

		await this.client.set(this.constructKey(id), serializedEntity);
	}

	public constructKey(id: string): string {
		return this.prefix ? `${this.prefix}:${id}` : id;
	}
}
