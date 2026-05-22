import { Injectable } from '@nestjs/common';
import { FabricaTopico } from './factories/fabrica-topico.factory';
import { FabricaMaterial } from './factories/fabrica-material.factory';
import { FabricaAvaliacao } from './factories/fabrica-avaliacao.factory';
import { PostConteudo } from './models/post-conteudo.model';
import { ComentariosService } from '../comentarios/comentarios.service';
import { Usuario } from 'src/usuarios/models/usuario';

@Injectable()
export class PostsService {
  private readonly fabricaTopico = new FabricaTopico();
  private readonly fabricaMaterial = new FabricaMaterial();
  private readonly fabricaAvaliacao = new FabricaAvaliacao();

  private readonly posts = new Map<string, PostConteudo>();

  constructor(private readonly comentariosService: ComentariosService) {}

  criarPostTopico(
    texto: string,
    descricao: string,
    criador: Usuario,
  ): PostConteudo {
    const post = this.fabricaTopico.criarPost(texto, descricao, criador);
    post.postar();
    this.posts.set(post.toJSON().id, post);
    return post;
  }

  criarPostMaterial(
    texto: string,
    descricao: string,
    criador: Usuario,
  ): PostConteudo {
    const post = this.fabricaMaterial.criarPost(texto, descricao, criador);
    post.postar();
    this.posts.set(post.toJSON().id, post);
    return post;
  }

  criarPostAvaliacao(
    texto: string,
    descricao: string,
    criador: Usuario,
  ): PostConteudo {
    const post = this.fabricaAvaliacao.criarPost(texto, descricao, criador);
    post.postar();
    this.posts.set(post.toJSON().id, post);
    return post;
  }

  listarPosts(): object[] {
    return Array.from(this.posts.values()).map((p) => {
      const postJSON = p.toJSON() as any;

      if (postJSON.tipo === 'topico') {
        const comentarios = this.comentariosService.listarComentariosJSON(
          postJSON.id,
        ) as any[];
        postJSON.threadComentario = {
          respostas: this.normalizarThreadComentarios(comentarios),
        };
      }

      return postJSON;
    });
  }

  private normalizarThreadComentarios(items: any[]): any[] {
    return items.flatMap((item) => {
      const nestedResponses =
        item?.threadComentario?.respostas ?? item?.respostas ?? [];

      if (!item || typeof item !== 'object') {
        return [];
      }

      if (!('texto' in item)) {
        const normalizedNestedResponses =
          this.normalizarThreadComentarios(nestedResponses);

        if (normalizedNestedResponses.length === 0) {
          return [];
        }

        const [parentComment, ...replyComments] = normalizedNestedResponses;

        return [
          {
            ...parentComment,
            threadComentario: {
              respostas: replyComments,
            },
          },
        ];
      }

      return [
        {
          ...item,
          threadComentario: {
            respostas: this.normalizarThreadComentarios(nestedResponses),
          },
        },
      ];
    });
  }
}
