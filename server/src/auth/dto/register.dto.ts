import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class RegisterDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}