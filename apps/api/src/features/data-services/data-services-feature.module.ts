import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { Module } from "@nestjs/common";
import { UserFeatureModule } from "../user/user-feature.module";
import { TokenRepositoryService } from "./token/token-repository.service";
import { UserRepositoryService } from "./user/user-repository.service";

@Module({
	imports: [DataServicesModule, UserFeatureModule],
	providers: [TokenRepositoryService, UserRepositoryService],
	exports: [TokenRepositoryService, UserRepositoryService],
})
export class DataServicesFeatureModule {}
