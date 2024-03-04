import { CreateUserDto } from "@/core/dtos/user.dto";
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

  public createFromDto(createUserDto: CreateUserDto): User {
    const user = new User();

    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.name = createUserDto.name;

    return user;
  }
}
