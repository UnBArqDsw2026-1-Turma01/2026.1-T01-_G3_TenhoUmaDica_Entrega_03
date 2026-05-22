import { IsNotEmpty } from 'class-validator';

export class AdicionarObservadorDto {
  @IsNotEmpty()
  usuarioId!: string;
}
