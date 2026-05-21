import { Aluno } from 'src/modules/usuarios/models/aluno';
import { UsuarioBuilder } from './usuarioBuilder';

export class AlunoBuilder implements UsuarioBuilder {
  private uid!: string;
  private rascunho: Partial<Aluno> = {};

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.rascunho = {};
  }

  public setUid(uid: string): this {
    this.uid = uid;
    return this;
  }

  public setNome(nome: string): this {
    this.rascunho.nome = nome;
    return this;
  }

  public setEmail(email: string): this {
    this.rascunho.email = email;
    return this;
  }

  public setBio(bio: string): this {
    this.rascunho.bio = bio;
    return this;
  }

  public setFoto(foto: string): this {
    this.rascunho.foto = foto;
    return this;
  }

  // =================================================================
  //                   Métodos do Aluno
  // =================================================================

  public setMatricula(matricula: string): this {
    this.rascunho.matricula = matricula;
    return this;
  }

  public setSemestreAtual(semestre: number): this {
    this.rascunho.semestreAtual = semestre;
    return this;
  }

  public getResultado(): Aluno {
    if (!this.uid || !this.rascunho.nome || !this.rascunho.email) {
      throw new Error('Faltam dados obrigatórios para construir o Aluno.');
    }

    const alunoReal = new Aluno(
      this.uid,
      this.rascunho.nome,
      this.rascunho.email,
      this.rascunho.bio || '',
      this.rascunho.foto || '',
    );

    alunoReal.matricula = this.rascunho.matricula!;
    alunoReal.semestreAtual = this.rascunho.semestreAtual!;

    this.reset();
    return alunoReal;
  }
}
