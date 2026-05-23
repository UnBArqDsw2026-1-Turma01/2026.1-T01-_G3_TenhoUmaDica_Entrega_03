import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '../auth.guard';
import { Usuario } from '../usuarios/models/usuario';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  listar() {
    return this.postsService.listarPosts();
  }

  @Post('topico')
  @UseGuards(AuthGuard)
  criarTopico(@Body() body: { texto: string; descricao: string }, @Req() req: any) {
    const criador = new Usuario(req.user.uid, req.user.name, req.user.email);
    return this.postsService.criarPostTopico(body.texto, body.descricao, criador).toJSON();
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

  @Post('anuncio')
  @UseGuards(AuthGuard)
  criarAnuncio(@Body() body: { texto: string; descricao: string }, @Req() req: any) {
    const criador = new Usuario(req.user.uid, req.user.name, req.user.email);
    return this.postsService.criarPostAnuncio(body.texto, body.descricao, criador).toJSON();
  }
}
