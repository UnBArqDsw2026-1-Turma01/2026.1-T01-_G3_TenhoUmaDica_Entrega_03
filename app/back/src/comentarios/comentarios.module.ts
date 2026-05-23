import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';

@Module({
  providers: [ComentariosService],
  exports: [ComentariosService],
})
export class ComentariosModule {}
