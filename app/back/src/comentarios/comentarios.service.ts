import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentManager } from './comment-manager';
import { Comentario } from './models/comentario.model';
import { ThreadComentario } from './models/thread-comentario.model';
import { ComponenteComentario } from './interfaces/componente-comentario.interface';

type Contenedor = CommentManager | ThreadComentario;

@Injectable()
export class ComentariosService {
  private readonly managers = new Map<string, CommentManager>();
  private readonly comentariosById = new Map<string, Comentario>();
  private readonly threadByComentarioId = new Map<string, ThreadComentario>();
  private readonly parentByComentarioId = new Map<string, Contenedor>();

  private getOrCreateManager(postId: string): CommentManager {
    if (!this.managers.has(postId)) {
      this.managers.set(postId, new CommentManager());
    }
    return this.managers.get(postId)!;
  }

  private adicionarAoContenedor(contenedor: Contenedor, componente: ComponenteComentario): void {
    if (contenedor instanceof CommentManager) {
      contenedor.adicionar(componente);
    } else {
      contenedor.adicionarResposta(componente);
    }
  }

  private removerDoContenedor(contenedor: Contenedor, componente: ComponenteComentario): void {
    if (contenedor instanceof CommentManager) {
      contenedor.remover(componente);
    } else {
      contenedor.removerResposta(componente);
    }
  }

  adicionarComentario(postId: string, texto: string, idCriador: string): Comentario {
    const manager = this.getOrCreateManager(postId);
    const comentario = new Comentario(texto, idCriador);
    this.comentariosById.set(comentario.getId(), comentario);
    manager.adicionar(comentario);
    this.parentByComentarioId.set(comentario.getId(), manager);
    return comentario;
  }

  adicionarResposta(
    postId: string,
    comentarioPaiId: string,
    texto: string,
    idCriador: string,
  ): Comentario {
    const pai = this.comentariosById.get(comentarioPaiId);

    if (!pai) {
      throw new NotFoundException(`Comentário ${comentarioPaiId} não encontrado`);
    }

    const resposta = new Comentario(texto, idCriador);
    this.comentariosById.set(resposta.getId(), resposta);

    let thread = this.threadByComentarioId.get(comentarioPaiId);
    if (!thread) {
      thread = new ThreadComentario();
      const contenedor = this.parentByComentarioId.get(comentarioPaiId)!;

      this.removerDoContenedor(contenedor, pai);
      thread.adicionarResposta(pai);
      this.adicionarAoContenedor(contenedor, thread);

      this.parentByComentarioId.set(comentarioPaiId, thread);
      this.threadByComentarioId.set(comentarioPaiId, thread);
    }

    thread.adicionarResposta(resposta);
    this.parentByComentarioId.set(resposta.getId(), thread);
    return resposta;
  }

  listarComentariosJSON(postId: string): object[] {
    const manager = this.getOrCreateManager(postId);
    return manager.getComponentes().map((c) =>
      typeof (c as any).toJSON === 'function' ? (c as any).toJSON() : c,
    );
  }
}
