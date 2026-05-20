export interface UsuarioBuilder {
  reset(): void;
  setNome(nome: string): this;
  setEmail(email: string): this;
  setSenha(senha: string): this;
  setBio(bio: string): this;
  setFoto(foto: string): this;
}
