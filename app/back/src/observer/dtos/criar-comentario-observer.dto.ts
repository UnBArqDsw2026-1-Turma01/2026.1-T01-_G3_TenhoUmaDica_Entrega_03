import { IsNotEmpty } from 'class-validator';

export class CriarComentarioObserverDto {
  @IsNotEmpty()
  texto!: string;
}
