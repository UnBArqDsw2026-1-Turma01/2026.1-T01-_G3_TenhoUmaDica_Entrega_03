import { Module } from '@nestjs/common';
import { ForumFacade } from './forum.facade';
import { ForumController } from './forum.controller';
import { ComentariosModule } from '../comentarios/comentarios.module';
import { PostsModule } from '../posts/posts.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [ComentariosModule, PostsModule, UsuariosModule],
  controllers: [ForumController],
  providers: [ForumFacade],
  exports: [ForumFacade],
})
export class ForumModule {}
