import { User } from "./user.entity";

export class Story {
	id: string;

	title: string;

	subtitle: string;

	content: string;

	author: User | undefined;
}
