import { CryptoServicesModule } from "@/frameworks/crypto-services/crypto-services.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { Module } from "@nestjs/common";
import { UserFactoryService } from "./user-factory.service";
import { UserRepositoryService } from "./user-repository.service";

@Module({
	imports: [CryptoServicesModule, DataServicesModule],
	providers: [UserFactoryService, UserRepositoryService],
	exports: [UserFactoryService, UserRepositoryService],
})
export class UserFeatureModule {}
