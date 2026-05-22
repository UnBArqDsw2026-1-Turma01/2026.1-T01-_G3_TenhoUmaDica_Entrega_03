import { IsNotEmpty } from 'class-validator';

export class CriarBlocoCodigoDto {
  @IsNotEmpty()
  texto!: string;

  @IsNotEmpty()
  linguagem!: string;
}
