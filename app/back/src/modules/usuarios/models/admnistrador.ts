import { Usuario } from './usuario';

export interface Admnistrador extends Usuario {
  statusAtivo: boolean;
}
