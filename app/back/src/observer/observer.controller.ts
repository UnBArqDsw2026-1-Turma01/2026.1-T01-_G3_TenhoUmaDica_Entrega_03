import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ObserverService } from './observer.service';
import { CriarUsuarioObserverDto } from './dtos/criar-usuario-observer.dto';
import { CriarPostObserverDto } from './dtos/criar-post-observer.dto';
import { CriarComentarioObserverDto } from './dtos/criar-comentario-observer.dto';
import { AdicionarObservadorDto } from './dtos/adicionar-observador.dto';

@Controller('observer')
export class ObserverController {
  constructor(private readonly observerService: ObserverService) {}

  // ── Usuários (Observers) ───────────────────────────────────────────

  @Post('usuarios')
  criarUsuario(@Body() dto: CriarUsuarioObserverDto) {
    return this.observerService.criarUsuario(dto);
  }

  @Get('usuarios/:id')
  buscarUsuario(@Param('id') id: string) {
    return this.observerService.buscarUsuario(id);
  }

  @Get('usuarios/:id/notificacoes')
  listarNotificacoes(@Param('id') id: string) {
    return this.observerService.listarNotificacoes(id);
  }

  // ── Posts (Concrete Subject) ───────────────────────────────────────

  @Post('posts')
  criarPost(@Body() dto: CriarPostObserverDto) {
    return this.observerService.criarPost(dto);
  }

  @Get('posts/:id')
  buscarPost(@Param('id') id: string) {
    return this.observerService.buscarPost(id);
  }

  @Post('posts/:id/observar')
  adicionarObservadorPost(@Param('id') id: string, @Body() dto: AdicionarObservadorDto) {
    return this.observerService.adicionarObservadorPost(id, dto.usuarioId);
  }

  @Delete('posts/:id/observar/:usuarioId')
  removerObservadorPost(@Param('id') id: string, @Param('usuarioId') usuarioId: string) {
    return this.observerService.removerObservadorPost(id, usuarioId);
  }

  @Post('posts/:id/curtir')
  curtirPost(@Param('id') id: string) {
    return this.observerService.curtirPost(id);
  }

  @Post('posts/:id/descurtir')
  descurtirPost(@Param('id') id: string) {
    return this.observerService.descurtirPost(id);
  }

  @Post('posts/:id/comentar')
  comentarPost(@Param('id') id: string, @Body() dto: CriarComentarioObserverDto) {
    return this.observerService.comentarPost(id, dto);
  }

  // ── Comentários (Concrete Subject) ────────────────────────────────

  @Post('comentarios')
  criarComentario(@Body() dto: CriarComentarioObserverDto) {
    return this.observerService.criarComentario(dto);
  }

  @Get('comentarios/:id')
  buscarComentario(@Param('id') id: string) {
    return this.observerService.buscarComentario(id);
  }

  @Post('comentarios/:id/observar')
  adicionarObservadorComentario(@Param('id') id: string, @Body() dto: AdicionarObservadorDto) {
    return this.observerService.adicionarObservadorComentario(id, dto.usuarioId);
  }

  @Post('comentarios/:id/curtir')
  curtirComentario(@Param('id') id: string) {
    return this.observerService.curtirComentario(id);
  }

  @Post('comentarios/:id/descurtir')
  descurtirComentario(@Param('id') id: string) {
    return this.observerService.descurtirComentario(id);
  }

  @Post('comentarios/:id/responder')
  responderComentario(@Param('id') id: string, @Body() dto: CriarComentarioObserverDto) {
    return this.observerService.responderComentario(id, dto);
  }
}
