import { Usuario } from './usuario';

export class Aluno extends Usuario {
  matricula!: string;
  semestreAtual!: number;

  constructor(
    uid: string,
    nome: string,
    email: string,
    bio: string,
    foto: string,
  ) {
    super(uid, nome, email, bio, foto);
  }
}
