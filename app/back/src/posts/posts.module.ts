import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { ComentariosModule } from '../comentarios/comentarios.module';

@Module({
  imports: [ComentariosModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
