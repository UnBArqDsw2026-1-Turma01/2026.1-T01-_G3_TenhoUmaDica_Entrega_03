import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { AuthGuard } from '../auth.guard';

@Controller('posts/:postId/comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Get()
  listar(@Param('postId') postId: string) {
    return this.comentariosService.listarComentariosJSON(postId);
  }

  @Post()
  @UseGuards(AuthGuard)
  criar(
    @Param('postId') postId: string,
    @Body() body: { texto: string },
    @Req() req: any,
  ) {
    const comentario = this.comentariosService.adicionarComentario(
      postId,
      body.texto,
      req.user.uid,
    );
    return comentario.toJSON();
  }

  @Post(':comentarioId/respostas')
  @UseGuards(AuthGuard)
  responder(
    @Param('postId') postId: string,
    @Param('comentarioId') comentarioId: string,
    @Body() body: { texto: string },
    @Req() req: any,
  ) {
    const resposta = this.comentariosService.adicionarResposta(
      postId,
      comentarioId,
      body.texto,
      req.user.uid,
    );
    return resposta.toJSON();
  }
}
