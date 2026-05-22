import { UsuarioBuilder } from './usuarioBuilder';
import { Admnistrador } from 'src/usuarios/models/admnistrador';

export class AdministradorBuilder implements UsuarioBuilder {
  private uid!: string;
  private admin: Partial<Admnistrador> = {};

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.admin = {};
  }

  public setUid(uid: string): this {
    this.uid = uid;
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
    if (!this.admin.nome || !this.admin.email) {
      throw new Error('Faltam dados obrigatórios para construir o Admin.');
    }
    const adminReal = new Admnistrador(
      this.uid,
      this.admin.nome,
      this.admin.email,
    );

    adminReal.statusAtivo = this.admin.statusAtivo!;

    this.reset();
    return adminReal;
  }
}
