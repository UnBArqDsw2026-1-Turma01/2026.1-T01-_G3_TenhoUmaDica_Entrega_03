import { Injectable } from '@nestjs/common';
import { FabricaComentario } from './factories/fabrica-comentario.factory';
import { FabricaMaterial } from './factories/fabrica-material.factory';
import { FabricaAvaliacao } from './factories/fabrica-avaliacao.factory';
import { PostConteudo } from './models/post-conteudo.model';
import { Usuario } from '../usuarios/usuario.model';

@Injectable()
export class PostsService {
  private readonly fabricaComentario = new FabricaComentario();
  private readonly fabricaMaterial = new FabricaMaterial();
  private readonly fabricaAvaliacao = new FabricaAvaliacao();

  private readonly posts = new Map<string, PostConteudo>();

  criarPostComentario(texto: string, descricao: string, criador: Usuario): PostConteudo {
    const post = this.fabricaComentario.criarPost(texto, descricao, criador);
    post.postar();
    this.posts.set(post.toJSON().id, post);
    return post;
  }

  criarPostMaterial(texto: string, descricao: string, criador: Usuario): PostConteudo {
    const post = this.fabricaMaterial.criarPost(texto, descricao, criador);
    post.postar();
    this.posts.set(post.toJSON().id, post);
    return post;
  }

  criarPostAvaliacao(texto: string, descricao: string, criador: Usuario): PostConteudo {
    const post = this.fabricaAvaliacao.criarPost(texto, descricao, criador);
    post.postar();
    this.posts.set(post.toJSON().id, post);
    return post;
  }

  listarPosts(): object[] {
    return Array.from(this.posts.values()).map((p) => p.toJSON());
  }
}
