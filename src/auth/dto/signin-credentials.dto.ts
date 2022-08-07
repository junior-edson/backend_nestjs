import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SignInCredentialsDto {
  @IsNotEmpty({ message: 'You must provide a valid e-mail' })
  @IsEmail({}, { message: 'E-mail provided is not valid' })
  email: string;

  @IsNotEmpty({ message: 'You must provide a password' })
  @MinLength(8, { message: 'Password must have 8 characters at least' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak. Provide uppercase and lowercase letters and numbers',
  })
  password: string;
}
