import { Module } from "@nestjs/common";
import { TokenRepositoryService } from "./token-repository.service";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { TokenEncryptionService } from "./token-encryption.service";
import { TokenFactoryService } from "./token-factory.service";
import { JwtAuthServicesModule } from "@/frameworks/auth-services/jwt/jwt-auth-services.module";

@Module({
  imports: [DataServicesModule, JwtAuthServicesModule],
  providers: [
    TokenRepositoryService,
    TokenEncryptionService,
    TokenFactoryService,
  ],
  exports: [
    TokenRepositoryService,
    TokenEncryptionService,
    TokenFactoryService,
  ],
})
export class TokenFeatureModule {}
