import { IsNotEmpty } from 'class-validator';

export class CriarBlocoEquacaoDto {
  @IsNotEmpty()
  texto!: string;
}
