import { IDataServices } from "@/core/abstracts/data-services.abstract";
import { Token } from "@/core/entities/token.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenRepositoryService {
	constructor(private dataServices: IDataServices) {}

	public async createToken(token: Token): Promise<Token> {
		return this.dataServices.tokens.create(token);
	}

	public async getTokenById(id: string): Promise<Token | null> {
		return this.dataServices.tokens.getById(id);
	}

	public async deleteToken(id: string): Promise<Token | null> {
		return this.dataServices.tokens.delete(id);
	}
}
