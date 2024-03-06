import { UserFactoryService } from "@/features/user/user-factory.service";
import { UserRepositoryService } from "@/features/user/user-repository.service";
import { User } from "@/features/user/user.decorator";
import { AccessTokenGuard } from "@/frameworks/auth-services/jwt/guards/access-token.guard";
import { TokenUser } from "@/frameworks/auth-services/jwt/types/token-user.interface";
import { Controller, Get, UseGuards } from "@nestjs/common";

@Controller("/users")
export class UserController {
  constructor(
    private userRepositoryService: UserRepositoryService,
    private userFactoryService: UserFactoryService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get("/me")
  public async me(@User() user: TokenUser) {
    const dbUser = await this.userRepositoryService.getUserById(user.id);

    return { user: this.userFactoryService.createDto(dbUser) };
  }
}
