import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CriarUsuarioObserverDto {
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  foto?: string;
}
