import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto extends User {
  @ApiProperty({
    example: 'andrews.carlos@gmail.com',
    description:
      ' o email é necessario para o login, mas não necessariamente precisa ser o mesmo email da rede social',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123@Abc',
    description:
      ' a senha é necessario para o login, mas não necessariamente precisa ser o mesmo email da rede social',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;


  @ApiProperty({
    example: 'Andrews Carlos',
    description:
      ' o nome é necessario para o login, mas não necessariamente precisa ser o mesmo email da rede social',
  })
  @IsString()
  name: string;
}
