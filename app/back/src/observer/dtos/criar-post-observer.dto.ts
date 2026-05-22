import { IsNotEmpty } from 'class-validator';

export class CriarPostObserverDto {
  @IsNotEmpty()
  texto!: string;

  @IsNotEmpty()
  descricao!: string;
}
