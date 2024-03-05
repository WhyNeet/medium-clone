import { CreateUserDto } from "@/core/dtos/user.dto";
import { User } from "@/core/entities/user.entity";
import { CryptoService } from "@/frameworks/auth-services/crypto/crypto.service";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class UserFactoryService {
  constructor(private cryptoService: CryptoService) {}

  public createNewUser(
    email: string,
    username: string,
    password: string,
    name: string,
    bio?: string,
    avatarId?: string,
  ): User {
    const user = new User();

    user._id = new Types.ObjectId();
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

    user._id = new Types.ObjectId();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.name = createUserDto.name;

    return user;
  }

  /**
   * Encrypts user's password.
   *
   * @param user The user entity.
   * @returns {Promise<User>} User with encrypted password.
   */
  public async createEncrypted(user: User): Promise<User> {
    user.password = await this.cryptoService.hashPassword(user.password);

    return user;
  }
}
