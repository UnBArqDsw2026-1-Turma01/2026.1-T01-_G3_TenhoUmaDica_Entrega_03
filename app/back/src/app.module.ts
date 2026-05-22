import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

@Module({
  imports: [
    UsuariosModule,
    ComentariosModule,
    PostsModule,
    ComentariosModule,
    UsuariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
