import type { User } from "@/core/entities/user.entity";
import { UserFactoryService } from "./user-factory.service";
import { IDataServices } from "@/core/abstracts/data-services.abstract";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "@/core/dtos/user.dto";

@Injectable()
export class UserRepositoryService {
  constructor(
    private dataServices: IDataServices,
    private userFactoryService: UserFactoryService,
  ) {}

  public createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userFactoryService.createFromDto(createUserDto);

    return this.dataServices.users.create(user);
  }

  public getUserById(id: string): Promise<User | null> {
    return this.dataServices.users.getById(id);
  }

  public getUserByEmail(email: string): Promise<User | null> {
    return this.dataServices.users.get({ email });
  }

  public updateUser(id: string, user: User): Promise<User | null> {
    return this.dataServices.users.update(id, user);
  }

  public deleteUser(id: string): Promise<User | null> {
    return this.dataServices.users.delete(id);
  }
}
