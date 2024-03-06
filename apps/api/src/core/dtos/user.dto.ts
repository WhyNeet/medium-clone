import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class UserDto {
  id: string;

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
  @MinLength(2, { message: "must be at least 2 characters long" })
  @MaxLength(32, { message: "must be at most 32 characters long" })
  @Matches(/^[0-9A-Za-z_-]{2,32}$/, { message: "must be a valid username" })
  username: string;

  @IsString({ message: "must be a string" })
  @MinLength(8, { message: "must be at least 8 characters long" })
  @MaxLength(72, { message: "must be at most 72 characters long" })
  password: string;

  @IsString({ message: "must be a string" })
  @MinLength(1, { message: "must be at least 1 character long" })
  @MaxLength(32, { message: "must be at most 32 characters long" })
  name: string;
}

export class UserCredentialsDto {
  @IsString({ message: "must be a string" })
  @IsEmail({}, { message: "must ve a valid email" })
  email: string;

  @IsString({ message: "must be a string" })
  @MinLength(8, { message: "must be at least 8 characters long" })
  @MaxLength(72, { message: "must be at most 72 characters long" })
  password: string;
}
