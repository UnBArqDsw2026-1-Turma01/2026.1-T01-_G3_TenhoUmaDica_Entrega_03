import { IsIn, IsArray, ValidateNested, IsNumber, IsOptional, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class TopicoFeedDto {
  @IsOptional()
  id?: string | number;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsNumber()
  votos: number;

  @IsNotEmpty()
  dataCriacao: string | Date | number;
}

export class OrdenarFeedDto {
  @IsIn(['votos', 'data', 'relevancia'])
  algoritmo: 'votos' | 'data' | 'relevancia';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopicoFeedDto)
  topicos: TopicoFeedDto[];
}
