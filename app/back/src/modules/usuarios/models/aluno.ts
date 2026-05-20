import { Usuario } from './usuario';

export interface Aluno extends Usuario {
  matricula: string;
  semestreIngressante: number;
}
