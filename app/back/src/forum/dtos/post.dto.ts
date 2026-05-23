import { IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  texto!: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  tipo?: string; // 'topico' | 'material' | 'avaliacao'

  @IsOptional()
  @IsString()
  autorId?: string;

  @IsOptional()
  @IsString()
  topicoId?: string;
}
