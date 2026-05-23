import { Controller, Post, Get, Body } from '@nestjs/common';
import { OrdenacaoStrategyService } from './ordenacao-strategy.service';
import { OrdenarFeedDto } from './dtos/ordenar-feed.dto';
import { TopicoFeed } from './models/topico-feed.model';

@Controller('feed')
export class OrdenacaoStrategyController {
  constructor(private readonly service: OrdenacaoStrategyService) {}

  @Get('algoritmos')
  listarAlgoritmos(): string[] {
    return this.service.listarAlgoritmos();
  }

  @Post('ordenar')
  ordenar(@Body() dto: OrdenarFeedDto): TopicoFeed[] {
    return this.service.ordenar(dto.topicos, dto.algoritmo);
  }
}
