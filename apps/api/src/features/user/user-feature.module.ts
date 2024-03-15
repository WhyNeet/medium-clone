import { Module } from "@nestjs/common";
import { UserFactoryService } from "./user-factory.service";
import { CryptoModule } from "@/frameworks/auth-services/crypto/crypto.module";

@Module({
  imports: [CryptoModule],
  providers: [UserFactoryService],
  exports: [UserFactoryService],
})
export class UserFeatureModule {}
