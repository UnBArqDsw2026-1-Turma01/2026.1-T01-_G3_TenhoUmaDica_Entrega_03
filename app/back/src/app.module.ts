import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ComentariosModule } from './comentarios/comentarios.module';

@Module({
  imports: [
    PostsModule,
    ComentariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
