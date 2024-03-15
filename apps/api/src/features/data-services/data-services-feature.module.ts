import { Module } from "@nestjs/common";
import { TokenRepositoryService } from "./token/token-repository.service";
import { UserRepositoryService } from "./user/user-repository.service";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { UserFeatureModule } from "../user/user-feature.module";

@Module({
  imports: [DataServicesModule, UserFeatureModule],
  providers: [TokenRepositoryService, UserRepositoryService],
  exports: [TokenRepositoryService, UserRepositoryService],
})
export class DataServicesFeatureModule {}
