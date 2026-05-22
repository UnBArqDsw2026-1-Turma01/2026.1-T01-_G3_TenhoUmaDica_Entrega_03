import { Injectable } from '@nestjs/common';
import { ComentariosService } from '../comentarios/comentarios.service';

@Injectable()
export class ForumFacade {
  constructor(private readonly comentariosService: ComentariosService) {}

  public exibirTopicosComPosts(): any {
    return { mensagem: 'Implementação futura: Lista de Tópicos com seus respectivos Posts' };
  }

  public exibirPostsComComentarios(postId: string): any {
    const arvoreDeComentarios = this.comentariosService.listarComentariosJSON(postId);
    return {
      postId: postId,
      comentarios: arvoreDeComentarios
    };
  }

  public exibirComentariosDoPost(postId: string): any {
    return this.comentariosService.listarComentariosJSON(postId);
  }

  public listarProfessoresDisciplina(disciplinaId: string): any {
    return { mensagem: 'Implementação futura: Lista de Professores' };
  }
}
