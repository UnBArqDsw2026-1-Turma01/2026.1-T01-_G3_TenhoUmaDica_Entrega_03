import { Injectable, BadRequestException } from '@nestjs/common';
import { Feed } from './Feed';
import { AlgoritmoOrdenacao } from './interfaces/algoritmo-ordenacao.interface';
import { TopicoFeed } from './models/topico-feed.model';
import { OrdenaPorVotos } from './strategies/OrdenaPorVotos';
import { OrdenaPorData } from './strategies/OrdenaPorData';
import { OrdenaPorRelevancia } from './strategies/OrdenaPorRelevancia';
import { OrdenaPorMenosPopulares } from './strategies/OrdenaPorMenosPopulares';

@Injectable()
export class OrdenacaoStrategyService {
  private readonly estrategias: Record<string, AlgoritmoOrdenacao> = {
    votos: new OrdenaPorVotos(),
    data: new OrdenaPorData(),
    relevancia: new OrdenaPorRelevancia(),
    menosPopulares: new OrdenaPorMenosPopulares(),
  };

  ordenar(topicos: TopicoFeed[], algoritmo: string): TopicoFeed[] {
    const estrategia = this.estrategias[algoritmo];
    if (!estrategia) {
      throw new BadRequestException(
        `Algoritmo "${algoritmo}" inválido. Use: votos, data, relevancia ou menosPopulares.`,
      );
    }
    const feed = new Feed(estrategia, topicos);
    return feed.executarOrdenacao();
  }

  listarAlgoritmos(): string[] {
    return Object.keys(this.estrategias);
  }
}
