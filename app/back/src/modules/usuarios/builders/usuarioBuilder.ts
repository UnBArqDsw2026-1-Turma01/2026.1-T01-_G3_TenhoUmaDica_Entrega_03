import { Usuario } from '../models/usuario';

export interface UsuarioBuilder {
  reset(): void;
  setNome(nome: string): this;
  setEmail(email: string): this;
  setBio(bio: string): this;
  setFoto(foto: string): this;

  getResultado(): Usuario;
}
