import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { BlocosService } from './blocos.service';
import { CriarBlocoTextoDto } from './dtos/bloco-texto.dto';
import { CriarBlocoCodigoDto } from './dtos/bloco-codigo.dto';
import { CriarBlocoEquacaoDto } from './dtos/bloco-equacao.dto';

@Controller('blocos')
export class BlocosController {
  constructor(private readonly blocosService: BlocosService) {}

  @Post('lista')
  criarLista() {
    return this.blocosService.criarLista();
  }

  @Post('lista/:id/texto')
  adicionarTexto(@Param('id') id: string, @Body() dto: CriarBlocoTextoDto) {
    return this.blocosService.adicionarTexto(id, dto);
  }

  @Post('lista/:id/codigo')
  adicionarCodigo(@Param('id') id: string, @Body() dto: CriarBlocoCodigoDto) {
    return this.blocosService.adicionarCodigo(id, dto);
  }

  @Post('lista/:id/equacao')
  adicionarEquacao(@Param('id') id: string, @Body() dto: CriarBlocoEquacaoDto) {
    return this.blocosService.adicionarEquacao(id, dto);
  }

  @Get('lista/:id')
  renderizar(@Param('id') id: string) {
    return this.blocosService.renderizar(id);
  }
}
