import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../uset-status.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}
