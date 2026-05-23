import { Controller, Get, Param, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ForumFacade } from './forum.facade';
import { AuthGuard } from '../auth.guard';
import { TopicoDto } from './dtos/topico.dto';
import { ComentarioDto } from './dtos/comentario.dto';
import { PostDto } from './dtos/post.dto';
import { Logger } from '@nestjs/common';

@Controller('forum')
export class ForumController {
  private readonly logger = new Logger(ForumController.name);
  
  constructor(private readonly forumFacade: ForumFacade) {}

  @Get('topicos')
  exibirTopicosComPosts() {
    return this.forumFacade.exibirTopicosComPosts();
  }

  @Post('topicos')
  @UseGuards(AuthGuard)
  criarTopico(@Body() dto: TopicoDto, @Req() req: any) {
    const auth = req.headers?.authorization;
    const tokenPreview = auth ? `${auth.slice(0, 16)}...` : 'none';
    this.logger.log(`POST /forum/topicos received. Authorization=${!!auth} preview=${tokenPreview}`);
    this.logger.debug(`req.user preview: ${JSON.stringify(req.user ?? {}).slice(0, 200)}`);
    try {
    return this.forumFacade.criarTopico(dto, req.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.stack ?? err.message : String(err);
      this.logger.error('Error in criarTopico', errorMessage);
      throw err;
    }
  }

  @Get('posts/:postId/completo')
  exibirPostsComComentarios(@Param('postId') postId: string) {
    return this.forumFacade.exibirPostsComComentarios(postId);
  }

  @Post('posts/:postId/comentarios')
  @UseGuards(AuthGuard)
  criarComentario(@Param('postId') postId: string, @Body() body: { texto: string }, @Req() req: any) {
    const auth = req.headers?.authorization;
    this.logger.log(`POST /forum/posts/${postId}/comentarios received. Authorization=${!!auth}`);
    return this.forumFacade.adicionarComentario({ texto: body.texto, postId }, req.user.uid);
  }

  @Post('posts/:postId/comentarios/:comentarioId/respostas')
  @UseGuards(AuthGuard)
  criarResposta(
    @Param('postId') postId: string,
    @Param('comentarioId') comentarioId: string,
    @Body() body: { texto: string },
    @Req() req: any,
  ) {
    const auth = req.headers?.authorization;
    this.logger.log(`POST /forum/posts/${postId}/comentarios/${comentarioId}/respostas received. Authorization=${!!auth}`);
    return this.forumFacade.adicionarResposta(postId, comentarioId, body.texto, req.user.uid);
  }

  @Get('posts/:postId/comentarios')
  exibirComentariosDoPost(@Param('postId') postId: string) {
    return this.forumFacade.exibirComentariosDoPost(postId);
  }

  @Get('disciplinas/:disciplinaId/professores')
  listarProfessoresDisciplina(@Param('disciplinaId') disciplinaId: string) {
    return this.forumFacade.listarProfessoresDisciplina(disciplinaId);
  }

  @Post('posts/avaliacao')
  @UseGuards(AuthGuard)
  criarAvaliacao(@Body() body: { texto: string; descricao: string }, @Req() req: any) {
    const auth = req.headers?.authorization;
    this.logger.log(`POST /forum/posts/avaliacao received. Authorization=${!!auth}`);
    return this.forumFacade.criarAvaliacao({ texto: body.texto, descricao: body.descricao }, req.user);
  }
}