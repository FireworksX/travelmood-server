import { IsString, IsEmail, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { UserRole } from '@interfaces/users.interface';

enum RoleEnum {
  guide = 'guide',
  client = 'client',
  admin = 'admin',
}

export class CreateUserDto {
  @IsOptional()
  @IsString()
  public first_name: string;

  @IsOptional()
  @IsString()
  public last_name: string;

  @IsString()
  public username: string;

  @IsOptional()
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsOptional()
  @IsNumber()
  public tg_chat_id: number;

  @IsEnum(RoleEnum, { each: true })
  public role: UserRole[];
}
