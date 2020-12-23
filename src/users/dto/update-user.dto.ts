import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  readonly age?: number;

  @IsString()
  @IsOptional()
  readonly name?: string;
}
