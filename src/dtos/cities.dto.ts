import { IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  public name: string;
}
