import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ForumModule } from './forum/forum.module';
import { BlocosModule } from './blocos/blocos.module';
import { OrdenacaoStrategyModule } from './ordenacao-strategy/ordenacao-strategy.module';

@Module({
  imports: [
    UsuariosModule,
    ComentariosModule,
    PostsModule,
    ForumModule,
    BlocosModule,
    OrdenacaoStrategyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
