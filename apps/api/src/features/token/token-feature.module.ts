import { CryptoServicesModule } from "@/frameworks/crypto-services/crypto-services.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { Module } from "@nestjs/common";
import { TokenEncryptionService } from "./token-encryption.service";
import { TokenFactoryService } from "./token-factory.service";
import { TokenRepositoryService } from "./token-repository.service";

@Module({
	imports: [DataServicesModule, CryptoServicesModule],
	providers: [
		TokenEncryptionService,
		TokenFactoryService,
		TokenRepositoryService,
	],
	exports: [
		TokenEncryptionService,
		TokenFactoryService,
		TokenRepositoryService,
	],
})
export class TokenFeatureModule {}
