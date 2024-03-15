import { TokenRepositoryService } from "@/features/data-services/token/token-repository.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenService {
  constructor(private tokenRepositoryService: TokenRepositoryService) {}

  public async checkTokenId(jti: string): Promise<boolean> {
    const token = await this.tokenRepositoryService.getTokenById(jti);
    return !!token;
  }
}
