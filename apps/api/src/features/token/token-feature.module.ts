import { JwtAuthServicesModule } from "@/frameworks/auth-services/jwt/jwt-auth-services.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { Module } from "@nestjs/common";
import { TokenEncryptionService } from "./token-encryption.service";
import { TokenFactoryService } from "./token-factory.service";

@Module({
	imports: [DataServicesModule, JwtAuthServicesModule],
	providers: [TokenEncryptionService, TokenFactoryService],
	exports: [TokenEncryptionService, TokenFactoryService],
})
export class TokenFeatureModule {}
