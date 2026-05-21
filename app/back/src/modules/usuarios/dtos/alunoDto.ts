import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CriarAlunoDto {
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  senha!: string;

  @MinLength(9)
  matricula!: string;

  @IsNumber()
  semestreAtual!: number;
}
