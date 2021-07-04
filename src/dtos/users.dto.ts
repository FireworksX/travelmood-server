import { IsString, IsOptional, IsEnum, ValidateNested, IsArray } from 'class-validator';
import { UserRole } from '@interfaces/users.interface';
import { CreateContactDto } from '@dtos/contacts.dto';
import { Type } from 'class-transformer';

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

  @IsArray()
  public contacts: CreateContactDto[];

  @IsString()
  public password: string;

  @IsEnum(RoleEnum, { each: true })
  public role: UserRole[];
}
