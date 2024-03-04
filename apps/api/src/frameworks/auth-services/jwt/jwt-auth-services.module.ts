import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "./strategy/access-token.strategy";
import { CookiesExtractorService } from "./extractors/cookies-extractor.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

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
  providers: [AccessTokenStrategy, CookiesExtractorService],
  exports: [JwtModule],
})
export class JwtAuthServicesModule {}
