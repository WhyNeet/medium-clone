import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { Module } from "@nestjs/common";
import { UserFactoryService } from "./user-factory.service";
import { UserRepositoryService } from "./user-repository.service";
import { CryptoModule } from "@/frameworks/auth-services/crypto/crypto.module";

@Module({
  imports: [DataServicesModule, CryptoModule],
  providers: [UserFactoryService, UserRepositoryService],
  exports: [UserFactoryService, UserRepositoryService],
})
export class UserFeatureModule {}
