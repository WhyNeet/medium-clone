import { Module } from "@nestjs/common";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { TokenEncryptionService } from "./token-encryption.service";
import { TokenFactoryService } from "./token-factory.service";
import { JwtAuthServicesModule } from "@/frameworks/auth-services/jwt/jwt-auth-services.module";

@Module({
  imports: [DataServicesModule, JwtAuthServicesModule],
  providers: [TokenEncryptionService, TokenFactoryService],
  exports: [TokenEncryptionService, TokenFactoryService],
})
export class TokenFeatureModule {}
