import { IsIn, IsNotEmpty } from 'class-validator';

export class CriarBlocoTextoDto {
  @IsNotEmpty()
  texto!: string;

  @IsIn(['normal', 'titulo 1', 'citacao'])
  tipo!: string;
}
