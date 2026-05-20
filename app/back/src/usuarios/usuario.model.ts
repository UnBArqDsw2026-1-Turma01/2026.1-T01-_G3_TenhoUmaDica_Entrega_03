export class Usuario {
  readonly id: string;
  foto: string;
  nome: string;
  email: string;
  bio: string;
  readonly dataCadastro: Date;
  disciplinaSalva: string[] = [];
  topicoSalvo: string[] = [];
  conteudoSalvo: string[] = [];

  constructor(uid: string, nome: string, email: string, bio = '', foto = '') {
    this.id = uid;
    this.nome = nome;
    this.email = email;
    this.bio = bio;
    this.foto = foto;
    this.dataCadastro = new Date();
  }

  autenticar(): void {
    console.log(`[Usuario] autenticando ${this.email}`);
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
