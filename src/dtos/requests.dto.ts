import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  public name: string;

  @IsNumber()
  public user_id: number;

  @IsString()
  public city: string;

  @IsString()
  public text: string;

  @IsOptional()
  @IsString()
  public phone: string;

  @IsNumber({}, { each: true })
  public accept_guides: number[];
}

export class AcceptRequestDto {
  @IsNumber()
  public request_id: number;

  @IsNumber()
  public guide_id: number;
}
