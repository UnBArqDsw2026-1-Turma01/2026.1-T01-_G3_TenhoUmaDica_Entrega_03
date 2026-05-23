import { IsEnum, IsNotEmpty } from 'class-validator';
import { TipoTexto } from '../BlocoTexto'; // Ajuste o caminho relativo se necessário

export class CriarBlocoTextoDto {
  @IsNotEmpty()
  texto!: string;

  @IsEnum(TipoTexto, {
    message: 'O tipo deve ser um dos valores válidos do TipoTexto (ex: normal, titulo 1, citacao)'
  })
  tipo!: TipoTexto;
}
