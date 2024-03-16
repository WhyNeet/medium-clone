import { IAuthScopesResolverService } from "@/core/abstracts/auth-scopes-resolver.abstract";
import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Injectable()
export class AuthScopesResolverService
	implements IAuthScopesResolverService, OnApplicationBootstrap
{
	private readonly logger = new Logger(IAuthScopesResolverService.name);
	private availableScopes: string[];

	constructor(private adapterHost: HttpAdapterHost) {}

	public onApplicationBootstrap() {
		const httpAdapter = this.adapterHost.httpAdapter;
		const instance = httpAdapter.getHttpServer();

		const router = instance._events.request._router;

		this.availableScopes = [
			...router.stack
				.map((layer) => {
					if (!layer.route) return null;

					const path = (layer.route.path as string).slice(5);
					const scope = path.slice(0, path.indexOf("/"));

					return scope;
				})
				.filter((path) => path)
				.reduce((acc: Set<string>, val: string) => {
					acc.add(val);
					return acc;
				}, new Set<string>()),
		];

		this.logger.log(
			`Loaded ${
				this.availableScopes.length
			} authorization scopes: {${this.availableScopes.join(", ")}}`,
		);
	}

	public getAvailableScopes(): string[] {
		return this.availableScopes;
	}
}
