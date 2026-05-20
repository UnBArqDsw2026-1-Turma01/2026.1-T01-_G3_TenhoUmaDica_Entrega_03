import { Aluno } from 'src/modules/usuarios/models/aluno';
import { UsuarioBuilder } from './usuarioBuilder';

export class AlunoBuilder implements UsuarioBuilder {
  private aluno: Partial<Aluno> = {};

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.aluno = {};
  }

  public setNome(nome: string): this {
    this.aluno.nome = nome;
    return this;
  }

  public setEmail(email: string): this {
    this.aluno.email = email;
    return this;
  }

  public setSenha(senha: string): this {
    this.aluno.senha = senha;
    return this;
  }

  public setBio(bio: string): this {
    this.aluno.bio = bio;
    return this;
  }

  public setFoto(foto: string): this {
    this.aluno.foto = foto;
    return this;
  }

  // =================================================================
  //                        Métodos do Aluno
  // =================================================================

  public setMatricula(matricula: string): this {
    this.aluno.matricula = matricula;
    return this;
  }

  public setSemestreIngressante(semestre: number): this {
    this.aluno.semestreIngressante = semestre;
    return this;
  }

  public getResultado(): Aluno {
    this.aluno.dataCadastro = new Date();
    const resultado = this.aluno as Aluno;
    this.reset();
    return resultado;
  }
}
