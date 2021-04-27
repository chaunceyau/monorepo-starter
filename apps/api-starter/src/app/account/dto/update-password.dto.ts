import { Length } from 'class-validator'

export class UpdatePasswordDTO {
  @Length(6)
  oldPassword: string
  @Length(6)
  newPassword: string
}
