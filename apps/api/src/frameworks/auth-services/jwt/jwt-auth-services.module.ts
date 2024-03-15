import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "./strategy/access-token.strategy";
import { CookiesExtractorService } from "./extractors/cookies-extractor.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ApiTokenStrategy } from "./strategy/api-token.strategy";
import { TokenService } from "./services/token.service";
import { DataServicesFeatureModule } from "@/features/data-services/data-services-feature.module";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          algorithm: "HS256",
        },
      }),
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
