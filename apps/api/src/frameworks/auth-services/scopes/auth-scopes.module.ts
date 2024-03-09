import { Module } from "@nestjs/common";
import { AuthScopesResolverService } from "./auth-scopes-resolver.service";
import { IAuthScopesResolverService } from "@/core/abstracts/auth-scopes-resolver.abstract";

@Module({
  providers: [
    {
      provide: IAuthScopesResolverService,
      useClass: AuthScopesResolverService,
    },
  ],
  exports: [IAuthScopesResolverService],
})
export class AuthScopesModule {}
