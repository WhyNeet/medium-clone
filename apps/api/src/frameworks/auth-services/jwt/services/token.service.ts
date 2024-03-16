import { TokenType } from "@/core/entities/token.entity";
import { TokenRepositoryService } from "@/features/data-services/token/token-repository.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenService {
	constructor(private tokenRepositoryService: TokenRepositoryService) {}

	public async checkToken(jti: string, type: TokenType): Promise<boolean> {
		const token = await this.tokenRepositoryService.getTokenById(jti);
		return !!token && token.type === type;
	}
}
