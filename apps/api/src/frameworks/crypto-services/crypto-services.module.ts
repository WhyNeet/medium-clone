import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CryptoService } from "./crypto.service";

@Module({
	imports: [
		JwtModule.register({
			signOptions: {
				algorithm: "HS256",
			},
		}),
	],
	providers: [CryptoService],
	exports: [JwtModule, CryptoService],
})
export class CryptoServicesModule {}
