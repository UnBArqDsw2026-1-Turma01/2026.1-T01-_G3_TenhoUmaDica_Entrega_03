import { IsString } from 'class-validator';

export class TopicoDto {
  @IsString()
  titulo!: string;

  @IsString()
  conteudo!: string;
}
