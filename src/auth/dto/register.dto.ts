import {
  Equals,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'password must be 8 characters long' })
  password: string;

  @IsString()
  @Equals('password', { message: 'password not matched' })
  confirmPassword: string;

  @IsJSON()
  @IsNotEmpty()
  access: string;
}
