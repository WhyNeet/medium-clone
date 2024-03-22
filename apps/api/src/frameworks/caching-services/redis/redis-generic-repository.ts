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

	public async hGet<T>(id: string, key: string): Promise<T> {
		return (await this.client.hGet(this.constructKey(id), key)) as T;
	}

	public async hSet(
		id: string,
		key: string,
		value: string | number,
	): Promise<void> {
		await this.client.hSet(this.constructKey(id), key, value);
	}

	public async hSetMany(
		id: string,
		object: Record<string, string | number>,
	): Promise<void> {
		await this.client.hSet(this.constructKey(id), object);
	}

	public async hIncrBy(id: string, key: string, val: number): Promise<void> {
		await this.client.hIncrBy(this.constructKey(id), key, val);
	}

	public async hGetAll(id: string): Promise<Entity> {
		return (await this.client.hGetAll(this.constructKey(id))) as Entity;
	}

	public async exists(id: string): Promise<boolean> {
		return Boolean(await this.client.exists(id));
	}

	public constructKey(id: string): string {
		return this.prefix ? `${this.prefix}:${id}` : id;
	}
}
