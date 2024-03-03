import { IDataServices } from "@/core/abstracts/data-services.abstract";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { MongoGenericRepository } from "./mongo-generic-repository";
import { User, UserDocument } from "./model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  users: MongoGenericRepository<User>;

  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.UserModel);
  }
}
