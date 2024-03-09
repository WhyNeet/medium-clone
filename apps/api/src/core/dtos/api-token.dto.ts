import { IsString } from "class-validator";

export class CreateApiTokenDto {
  @IsString({ message: "must be a string" })
  scope: string;

  @IsString({ message: "must be a string" })
  expiresIn: string;
}
