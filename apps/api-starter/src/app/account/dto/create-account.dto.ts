import { IsEmail, Length } from 'class-validator'

export class CreateAccountDTO {
  @IsEmail()
  @Length(4)
  email: string
  @Length(6)
  password: string
}
