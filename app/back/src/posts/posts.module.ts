import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ComentariosModule } from '../comentarios/comentarios.module';

@Module({
  imports: [ComentariosModule],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
