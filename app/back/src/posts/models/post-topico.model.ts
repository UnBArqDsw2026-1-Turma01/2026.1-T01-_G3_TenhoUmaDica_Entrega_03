import { PostConteudo } from './post-conteudo.model';
import { ThreadComentario } from '../../comentarios/models/thread-comentario.model';
import { Comentario } from '../../comentarios/models/comentario.model';
import { Usuario } from '../../usuarios/usuario.model';

export class PostTopico extends PostConteudo {
  private imagens: string[];
  private threadComentario: ThreadComentario;

  constructor(texto: string, descricao: string, idCriador: Usuario) {
    super(texto, descricao, idCriador);
    this.imagens = [];
    this.threadComentario = new ThreadComentario();
  }

  addImagem(urlImagem: string): void {
    console.log(`[PostTopico ${this.id}] imagem adicionada: ${urlImagem}`);
    this.imagens.push(urlImagem);
  }

  adicionarComentario(comentario: Comentario): void {
    this.threadComentario.adicionarResposta(comentario);
  }

  renderizar(): void {
    console.log(`[PostTopico ${this.id}] renderizando com ${this.imagens.length} imagem(ns)`);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      tipo: 'topico',
      imagens: this.imagens,
      threadComentario: this.threadComentario.toJSON(),
    };
  }
}
