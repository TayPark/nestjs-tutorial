import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @Min(0)
  @Max(101)
  readonly age: number;

  @IsString()
  readonly name: string;
}
