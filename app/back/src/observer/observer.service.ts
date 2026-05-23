import { Injectable, NotFoundException } from '@nestjs/common';
import { PostConteudo } from './PostConteudo';
import { Comentario } from './Comentario';
import { Usuario } from './Usuario';
import { CriarPostObserverDto } from './dtos/criar-post-observer.dto';
import { CriarComentarioObserverDto } from './dtos/criar-comentario-observer.dto';
import { CriarUsuarioObserverDto } from './dtos/criar-usuario-observer.dto';

@Injectable()
export class ObserverService {
  private readonly posts = new Map<string, PostConteudo>();
  private readonly comentarios = new Map<string, Comentario>();
  private readonly usuarios = new Map<string, Usuario>();

  // ── Usuários (Observers) ───────────────────────────────────────────

  criarUsuario(dto: CriarUsuarioObserverDto): object {
    const usuario = new Usuario(dto.nome, dto.email, dto.foto, dto.bio);
    this.usuarios.set(usuario.getId(), usuario);
    return usuario.toJSON();
  }

  buscarUsuario(id: string): object {
    return this.getUsuario(id).toJSON();
  }

  listarNotificacoes(id: string): object {
    const usuario = this.getUsuario(id);
    return (usuario.toJSON() as any).notificacoes;
  }

  // ── Posts (Concrete Subject) ───────────────────────────────────────

  criarPost(dto: CriarPostObserverDto): object {
    const post = new PostConteudo(dto.texto, dto.descricao);
    post.postar();
    this.posts.set(post.getId(), post);
    return post.toJSON();
  }

  buscarPost(id: string): object {
    return this.getPost(id).toJSON();
  }

  adicionarObservadorPost(postId: string, usuarioId: string): object {
    const post = this.getPost(postId);
    const usuario = this.getUsuario(usuarioId);
    post.adicionarObservador(usuario);
    return { mensagem: `Usuário "${usuario.getNome()}" agora observa o post.`, post: post.toJSON() };
  }

  removerObservadorPost(postId: string, usuarioId: string): object {
    const post = this.getPost(postId);
    const usuario = this.getUsuario(usuarioId);
    post.removerObservador(usuario);
    return { mensagem: `Usuário "${usuario.getNome()}" removido dos observadores do post.`, post: post.toJSON() };
  }

  curtirPost(postId: string): object {
    const post = this.getPost(postId);
    post.addCurtida();
    return post.toJSON();
  }

  descurtirPost(postId: string): object {
    const post = this.getPost(postId);
    post.addDislike();
    return post.toJSON();
  }

  comentarPost(postId: string, dto: CriarComentarioObserverDto): object {
    const post = this.getPost(postId);
    const comentario = new Comentario(dto.texto);
    this.comentarios.set(comentario.getId(), comentario);
    post.adicionarComentario(comentario);
    return { post: post.toJSON(), comentario: comentario.toJSON() };
  }

  // ── Comentários (Concrete Subject) ────────────────────────────────

  criarComentario(dto: CriarComentarioObserverDto): object {
    const comentario = new Comentario(dto.texto);
    comentario.postar();
    this.comentarios.set(comentario.getId(), comentario);
    return comentario.toJSON();
  }

  buscarComentario(id: string): object {
    return this.getComentario(id).toJSON();
  }

  adicionarObservadorComentario(comentarioId: string, usuarioId: string): object {
    const comentario = this.getComentario(comentarioId);
    const usuario = this.getUsuario(usuarioId);
    comentario.adicionarObservador(usuario);
    return { mensagem: `Usuário "${usuario.getNome()}" agora observa o comentário.`, comentario: comentario.toJSON() };
  }

  curtirComentario(comentarioId: string): object {
    const comentario = this.getComentario(comentarioId);
    comentario.addCurtida();
    return comentario.toJSON();
  }

  descurtirComentario(comentarioId: string): object {
    const comentario = this.getComentario(comentarioId);
    comentario.addDislike();
    return comentario.toJSON();
  }

  responderComentario(comentarioId: string, dto: CriarComentarioObserverDto): object {
    const pai = this.getComentario(comentarioId);
    const resposta = new Comentario(dto.texto);
    this.comentarios.set(resposta.getId(), resposta);
    pai.responder(resposta);
    return { comentarioPai: pai.toJSON(), resposta: resposta.toJSON() };
  }

  // ── Helpers privados ──────────────────────────────────────────────

  private getPost(id: string): PostConteudo {
    const post = this.posts.get(id);
    if (!post) throw new NotFoundException(`Post ${id} não encontrado`);
    return post;
  }

  private getComentario(id: string): Comentario {
    const c = this.comentarios.get(id);
    if (!c) throw new NotFoundException(`Comentário ${id} não encontrado`);
    return c;
  }

  private getUsuario(id: string): Usuario {
    const u = this.usuarios.get(id);
    if (!u) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return u;
  }
}
