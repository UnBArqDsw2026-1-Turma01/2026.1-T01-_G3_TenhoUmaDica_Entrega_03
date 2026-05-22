import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComentariosModule } from './comentarios/comentarios.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule, ComentariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
