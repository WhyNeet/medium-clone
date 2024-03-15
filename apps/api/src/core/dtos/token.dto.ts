import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateApiTokenDto {
  @IsString({ message: "must be a string" })
  @MinLength(1, { message: "API token name must be at least 1 character long" })
  @MaxLength(32, {
    message: "API token name must be at most 32 characters long",
  })
  name: string;

  @IsString({ message: "must be a string" })
  scope: string;

  @IsString({ message: "must be a string" })
  expiresIn: string;
}
