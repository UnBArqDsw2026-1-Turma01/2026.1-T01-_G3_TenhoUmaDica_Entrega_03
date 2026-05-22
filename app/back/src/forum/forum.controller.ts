import { Controller, Get, Param } from '@nestjs/common';
import { ForumFacade } from './forum.facade';

@Controller('forum')
export class ForumController {
  
  constructor(private readonly forumFacade: ForumFacade) {}

  @Get('topicos')
  exibirTopicosComPosts() {
    return this.forumFacade.exibirTopicosComPosts();
  }

  @Get('posts/:postId/completo')
  exibirPostsComComentarios(@Param('postId') postId: string) {
    return this.forumFacade.exibirPostsComComentarios(postId);
  }

  @Get('posts/:postId/comentarios')
  exibirComentariosDoPost(@Param('postId') postId: string) {
    return this.forumFacade.exibirComentariosDoPost(postId);
  }

  @Get('disciplinas/:disciplinaId/professores')
  listarProfessoresDisciplina(@Param('disciplinaId') disciplinaId: string) {
    return this.forumFacade.listarProfessoresDisciplina(disciplinaId);
  }
}