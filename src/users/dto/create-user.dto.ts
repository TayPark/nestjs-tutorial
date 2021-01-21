import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @Min(0)
  @Max(101)
  @ApiProperty({
    description: 'Age of user',
    minimum: 0,
    maximum: 101,
  })
  readonly age: number;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}
