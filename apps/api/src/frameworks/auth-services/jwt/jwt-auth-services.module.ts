import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "./strategy/access-token.strategy";
import { CookiesExtractorService } from "./extractors/cookies-extractor.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RefreshTokenStrategy } from "./strategy/refresh-token.strategy";
import { ApiTokenStrategy } from "./strategy/api-token.strategy";

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
  ],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ApiTokenStrategy,
    CookiesExtractorService,
  ],
  exports: [JwtModule],
})
export class JwtAuthServicesModule {}
