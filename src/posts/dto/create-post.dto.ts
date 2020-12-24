import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsBoolean()
  @IsOptional()
  published: boolean;
}
