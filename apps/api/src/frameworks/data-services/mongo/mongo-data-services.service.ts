import { IDataServices } from "@/core/abstracts/data-services.abstract";
import { Story } from "@/core/entities/story.entity";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
	StoryDocument,
	Token,
	TokenDocument,
	User,
	UserDocument,
} from "./model";
import { MongoGenericRepository } from "./mongo-generic-repository";

@Injectable()
export class MongoDataServices
	implements IDataServices, OnApplicationBootstrap
{
	users: MongoGenericRepository<User>;
	tokens: MongoGenericRepository<Token>;
	stories: MongoGenericRepository<Story>;

	constructor(
		@InjectModel(User.name) private UserModel: Model<UserDocument>,
		@InjectModel(Token.name) private TokenModel: Model<TokenDocument>,
		@InjectModel(Story.name) private StoryModel: Model<StoryDocument>,
	) {}

	onApplicationBootstrap() {
		this.users = new MongoGenericRepository<User>(this.UserModel);
		this.tokens = new MongoGenericRepository<Token>(this.TokenModel);
		this.stories = new MongoGenericRepository(this.StoryModel);
	}
}
