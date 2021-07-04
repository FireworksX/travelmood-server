import { IsString, IsNumber } from 'class-validator';
import { ContactType } from '@interfaces/contacts.interface';

export class CreateContactDto {
  @IsString()
  public type: ContactType;

  @IsNumber()
  public value: string;
}
