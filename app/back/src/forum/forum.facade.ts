import { Injectable } from '@nestjs/common';
import { ComentariosService } from '../comentarios/comentarios.service';
import { PostsService } from '../posts/posts.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/models/usuario';
import { TopicoDto } from './dtos/topico.dto';
import { ComentarioDto } from './dtos/comentario.dto';
import { PostDto } from './dtos/post.dto';

@Injectable()
export class ForumFacade {
  constructor(
    private readonly comentariosService: ComentariosService,
    private readonly postsService: PostsService,
    private readonly usuariosService: UsuariosService,
  ) {}

  public exibirTopicosComPosts(): any {
    return this.postsService.listarPosts();
  }

  public exibirPostsComComentarios(postId: string): any {
    const post = this.postsService
      .listarPosts()
      .find((item: any) => item.id === postId);

    const arvoreDeComentarios = this.comentariosService.listarComentariosJSON(postId);

    return {
      ...(post ?? {
        id: postId,
        tipo: 'topico',
        texto: '',
        descricao: '',
        dataCriacao: new Date().toISOString(),
        contadorCurtida: 0,
        idCriador: '',
      }),
      threadComentario: {
        respostas: this.normalizarThreadComentarios(arvoreDeComentarios),
      },
    };
  }

  public exibirComentariosDoPost(postId: string): any {
    return this.comentariosService.listarComentariosJSON(postId);
  }

  public async criarTopico(dto: TopicoDto, user?: any): Promise<any> {
    const criador = new Usuario(user?.uid ?? user?.id ?? 'anon', user?.name ?? user?.nome ?? 'Anon', user?.email ?? 'anon@example.com');
    const post = this.postsService.criarPostTopico(dto.conteudo, dto.titulo, criador);
    return post.toJSON();
  }

  public async criarAvaliacao(dto: PostDto, user?: any): Promise<any> {
    const criador = new Usuario(user?.uid ?? user?.id ?? dto.autorId ?? 'anon', user?.name ?? user?.nome ?? 'Anon', user?.email ?? 'anon@example.com');
    const post = this.postsService.criarPostAvaliacao(dto.texto, dto.descricao ?? '', criador);
    return post.toJSON();
  }

  public adicionarComentario(dto: ComentarioDto, userId?: string): any {
    const comentario = this.comentariosService.adicionarComentario(dto.postId ?? '', dto.texto, userId ?? dto.autorId ?? 'anon');
    return comentario.toJSON();
  }

  public adicionarResposta(postId: string, comentarioPaiId: string, texto: string, userId?: string): any {
    const resposta = this.comentariosService.adicionarResposta(postId, comentarioPaiId, texto, userId ?? 'anon');
    return resposta.toJSON();
  }

  public listarProfessoresDisciplina(disciplinaId: string): any {
    return { mensagem: 'Implementação futura: Lista de Professores' };
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
