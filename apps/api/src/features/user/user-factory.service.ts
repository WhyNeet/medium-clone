import { User } from "@/core/entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserFactoryService {
  public createNewUser(
    email: string,
    username: string,
    password: string,
    name: string,
    bio?: string,
    avatarId?: string,
  ): User {
    const user = new User();

    user.email = email;
    user.username = username;
    user.password = password;
    user.name = name;
    user.bio = bio;
    user.avatarId = avatarId;

    return user;
  }
}
