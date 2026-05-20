import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '../auth.guard';
import { Usuario } from '../usuarios/usuario.model';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  listar() {
    return this.postsService.listarPosts();
  }

  @Post('comentario')
  @UseGuards(AuthGuard)
  criarComentario(@Body() body: { texto: string; descricao: string }, @Req() req: any) {
    const criador = new Usuario(req.user.uid, req.user.name, req.user.email);
    return this.postsService.criarPostComentario(body.texto, body.descricao, criador).toJSON();
  }

  @Post('material')
  @UseGuards(AuthGuard)
  criarMaterial(@Body() body: { texto: string; descricao: string }, @Req() req: any) {
    const criador = new Usuario(req.user.uid, req.user.name, req.user.email);
    return this.postsService.criarPostMaterial(body.texto, body.descricao, criador).toJSON();
  }

  @Post('avaliacao')
  @UseGuards(AuthGuard)
  criarAvaliacao(@Body() body: { texto: string; descricao: string }, @Req() req: any) {
    const criador = new Usuario(req.user.uid, req.user.name, req.user.email);
    return this.postsService.criarPostAvaliacao(body.texto, body.descricao, criador).toJSON();
  }
}
