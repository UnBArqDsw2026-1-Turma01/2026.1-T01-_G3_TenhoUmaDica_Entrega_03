import { PostConteudo } from './post-conteudo.model';
import { ThreadComentario } from '../../comentarios/thread-comentario.placeholder';
import { Usuario } from '../../usuarios/usuario.model';

export class PostComentario extends PostConteudo {
  private imagens: string[];
  private threadComentario: ThreadComentario | null;

  constructor(texto: string, descricao: string, idCriador: Usuario) {
    super(texto, descricao, idCriador);
    this.imagens = [];
    this.threadComentario = null;
  }

  addImagem(urlImagem: string): void {
    console.log(`[PostComentario ${this.id}] imagem adicionada: ${urlImagem}`);
    this.imagens.push(urlImagem);
  }

  renderizar(): void {
    console.log(`[PostComentario ${this.id}] renderizando com ${this.imagens.length} imagem(ns)`);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      tipo: 'comentario',
      imagens: this.imagens,
      threadComentario: this.threadComentario,
    };
  }
}
