import { UsuarioBuilder } from './usuarioBuilder';
import { Admnistrador } from 'src/modules/usuarios/models/admnistrador';

export class AdministradorBuilder implements UsuarioBuilder {
  private admin: Partial<Admnistrador> = {};

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.admin = {};
  }

  public setId(id: string): this {
    this.admin.id = id;
    return this;
  }
  public setNome(nome: string): this {
    this.admin.nome = nome;
    return this;
  }

  public setEmail(email: string): this {
    this.admin.email = email;
    return this;
  }

  public setBio(bio: string): this {
    this.admin.bio = bio;
    return this;
  }

  public setFoto(foto: string): this {
    this.admin.foto = foto;
    return this;
  }

  // =================================================================
  //                        Métodos do Admin
  // =================================================================

  public setStatusAtivo(status: boolean): this {
    this.admin.statusAtivo = status;
    return this;
  }

  public getResultado(): Admnistrador {
    this.admin.dataCadastro = new Date();
    const resultado = this.admin as Admnistrador;
    this.reset();
    return resultado;
  }
}
