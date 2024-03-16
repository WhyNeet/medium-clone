import { DataServicesFeatureModule } from "@/features/data-services/data-services-feature.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CookiesExtractorService } from "./extractors/cookies-extractor.service";
import { TokenService } from "./services/token.service";
import { AccessTokenStrategy } from "./strategy/access-token.strategy";
import { ApiTokenStrategy } from "./strategy/api-token.strategy";

@Module({
	imports: [
		JwtModule.register({
			signOptions: {
				algorithm: "HS256",
			},
		}),
		DataServicesFeatureModule,
	],
	providers: [
		AccessTokenStrategy,
		ApiTokenStrategy,
		CookiesExtractorService,
		TokenService,
	],
	exports: [JwtModule],
})
export class JwtAuthServicesModule {}
