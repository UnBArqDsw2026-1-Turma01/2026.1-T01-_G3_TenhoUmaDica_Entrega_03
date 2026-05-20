import { randomUUID } from 'crypto';

export class Usuario {
  readonly id: string;
  foto: string;
  nome: string;
  email: string;
  senha: string;
  bio: string;
  readonly dataCadastro: Date;
  disciplinaSalva: string[] = [];
  topicoSalvo: string[] = [];
  conteudoSalvo: string[] = [];

  constructor(nome: string, email: string, senha: string, bio = '', foto = '') {
    this.id = randomUUID();
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.bio = bio;
    this.foto = foto;
    this.dataCadastro = new Date();
  }

  autenticar(): void {
    console.log(`[Usuario] autenticando ${this.email}`);
  }

  alterarSenha(novaSenha: string): void {
    console.log(`[Usuario] alterando senha de ${this.email}`);
    this.senha = novaSenha;
  }

  salvarDisciplina(disciplinaId: string): void {
    console.log(`[Usuario] salvando disciplina ${disciplinaId}`);
    this.disciplinaSalva.push(disciplinaId);
  }

  salvarTopico(topicoId: string): void {
    console.log(`[Usuario] salvando tópico ${topicoId}`);
    this.topicoSalvo.push(topicoId);
  }

  salvarPostConteudo(postId: string): void {
    console.log(`[Usuario] salvando post ${postId}`);
    this.conteudoSalvo.push(postId);
  }

  curtirComentario(comentarioId: string): void {
    console.log(`[Usuario] curtindo comentário ${comentarioId}`);
  }

  curtirPostConteudo(postId: string): void {
    console.log(`[Usuario] curtindo post ${postId}`);
  }
}
