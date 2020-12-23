import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  category: string;

  @IsBoolean()
  published: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
