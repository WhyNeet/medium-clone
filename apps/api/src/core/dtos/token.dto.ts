import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateApiTokenDto {
  @IsString({ message: "must be a string" })
  @MinLength(1, { message: "API token name must be at least 1 character long" })
  @MaxLength(32, {
    message: "API token name must be at most 32 characters long",
  })
  name: string;

  @IsString({ message: "must be a string" })
  scope: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: "must be a number" },
  )
  // a minute
  @Min(60, { message: "must be at least 60 seconds" })
  // a year
  @Max(31536000, { message: "must not exceed 1 year" })
  expiresIn: number;
}
