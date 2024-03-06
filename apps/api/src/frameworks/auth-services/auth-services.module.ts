import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthServicesModule } from "./jwt/jwt-auth-services.module";
import { CryptoModule } from "./crypto/crypto.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtAuthServicesModule,
    CryptoModule,
  ],
  exports: [JwtAuthServicesModule, CryptoModule],
})
export class AuthServicesModule {}
