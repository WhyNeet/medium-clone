import { IDataServices } from "@/core/abstracts/data-services.abstract";
import { CreateUserDto } from "@/core/dtos/user.dto";
import type { User } from "@/core/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { UserFactoryService } from "../../user/user-factory.service";

@Injectable()
export class UserRepositoryService {
	constructor(
		private dataServices: IDataServices,
		private userFactoryService: UserFactoryService,
	) {}

	public async createUser(createUserDto: CreateUserDto): Promise<User> {
		const user = this.userFactoryService.createFromDto(createUserDto);
		const encryptedUser = await this.userFactoryService.createEncrypted(user);

		return this.dataServices.users.create(encryptedUser);
	}

	public getUserById(id: string): Promise<User | null> {
		return this.dataServices.users.getById(id);
	}

	public getUserByEmail(email: string): Promise<User | null> {
		return this.dataServices.users.get({ email });
	}

	public getUserByUsername(username: string): Promise<User | null> {
		return this.dataServices.users.get({ username });
	}

	public updateUser(id: string, user: User): Promise<User | null> {
		return this.dataServices.users.update(id, user);
	}

	public deleteUser(id: string): Promise<User | null> {
		return this.dataServices.users.delete(id);
	}
}
