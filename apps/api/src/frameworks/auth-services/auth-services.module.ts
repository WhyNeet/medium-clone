import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthServicesModule } from "./jwt/jwt-auth-services.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtAuthServicesModule,
  ],
  exports: [JwtAuthServicesModule],
})
export class AuthServicesModule {}
