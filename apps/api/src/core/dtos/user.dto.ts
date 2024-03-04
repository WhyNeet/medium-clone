import { IsEmail, IsString, Matches, Max, Min } from "class-validator";

export class UserDto {
  email: string;

  username: string;

  name: string;

  bio?: string;

  avatarId?: string;
}

export class CreateUserDto {
  @IsString({ message: "must be a string" })
  @IsEmail({}, { message: "must ve a valid email" })
  email: string;

  @IsString({ message: "must be a string" })
  @Min(2, { message: "must be at least 2 characters long" })
  @Max(32, { message: "must be at most 32 characters long" })
  @Matches(/^[0-9A-Za-z_-]{2,32}$/, { message: "must be a valid username" })
  username: string;

  @IsString({ message: "must be a string" })
  @Min(8, { message: "must be at least 8 characters long" })
  @Max(72, { message: "must be at most 72 characters long" })
  password: string;

  @IsString({ message: "must be a string" })
  @Min(1, { message: "must be at least 1 character long" })
  @Max(32, { message: "must be at most 32 characters long" })
  name: string;
}

export class UserCredentialsDto {
  @IsString({ message: "must be a string" })
  @IsEmail({}, { message: "must ve a valid email" })
  email: string;

  @IsString({ message: "must be a string" })
  @Min(8, { message: "must be at least 8 characters long" })
  @Max(72, { message: "must be at most 72 characters long" })
  password: string;
}
