import { IsOptional, IsString } from 'class-validator';

export class ComentarioDto {
  @IsString()
  texto!: string;

  @IsOptional()
  @IsString()
  autorId?: string;

  @IsOptional()
  @IsString()
  postId?: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}
