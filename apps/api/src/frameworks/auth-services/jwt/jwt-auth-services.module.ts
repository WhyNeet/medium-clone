import { AuthFeatureModule } from "@/features/auth/auth-feature.module";
import { Module } from "@nestjs/common";
import { CookiesExtractorService } from "./extractors/cookies-extractor.service";
import { AccessTokenStrategy } from "./strategy/access-token.strategy";
import { ApiTokenStrategy } from "./strategy/api-token.strategy";

@Module({
	imports: [AuthFeatureModule],
	providers: [AccessTokenStrategy, ApiTokenStrategy, CookiesExtractorService],
	exports: [],
})
export class JwtAuthServicesModule {}
