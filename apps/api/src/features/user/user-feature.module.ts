import { CryptoModule } from "@/frameworks/auth-services/crypto/crypto.module";
import { Module } from "@nestjs/common";
import { UserFactoryService } from "./user-factory.service";

@Module({
	imports: [CryptoModule],
	providers: [UserFactoryService],
	exports: [UserFactoryService],
})
export class UserFeatureModule {}
