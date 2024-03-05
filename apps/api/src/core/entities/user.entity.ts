import type { Types } from "mongoose";

export class User {
  _id: Types.ObjectId;

  email: string;

  username: string;

  password: string;

  name: string;

  bio?: string;

  avatarId?: string;
}
