import { Module } from '@nestjs/common';
import { ForumFacade } from './forum.facade';
import { ForumController } from './forum.controller';
import { ComentariosModule } from '../comentarios/comentarios.module';

@Module({
  imports: [ComentariosModule],
  controllers: [ForumController],
  providers: [ForumFacade],
  exports: [ForumFacade],
})
export class ForumModule {}
