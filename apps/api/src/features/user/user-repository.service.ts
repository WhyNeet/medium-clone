import type { User } from "@/core/entities/user.entity";
import type { ObjectId } from "mongoose";
import { UserFactoryService } from "./user-factory.service";
import { IDataServices } from "@/core/abstracts/data-services.abstract";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepositoryService {
  constructor(
    private dataServices: IDataServices,
    private userFactoryService: UserFactoryService,
  ) {}

  public createUser(user: User): Promise<User> {
    return this.dataServices.users.create(user);
  }

  public getUserById(id: ObjectId): Promise<User | null> {
    return this.dataServices.users.get(id);
  }

  public updateUser(id: ObjectId, user: User): Promise<User | null> {
    return this.dataServices.users.update(id, user);
  }

  public deleteUser(id: ObjectId): Promise<User | null> {
    return this.dataServices.users.delete(id);
  }
}
