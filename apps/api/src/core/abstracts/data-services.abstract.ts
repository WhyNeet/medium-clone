import type { Story } from "../entities/story.entity";
import type { Token } from "../entities/token.entity";
import type { User } from "../entities/user.entity";
import type { IGenericRepository } from "./generic-repository.abstract";

export abstract class IDataServices {
	abstract users: IGenericRepository<User>;
	abstract tokens: IGenericRepository<Token>;
	abstract stories: IGenericRepository<Story>;
}
