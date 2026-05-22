import { Usuario } from './usuario';

export class Admnistrador extends Usuario {
  statusAtivo!: boolean;

  constructor(uid: string, nome: string, email: string, bio = '', foto = '') {
    super(uid, nome, email, bio, foto);
  }
}
