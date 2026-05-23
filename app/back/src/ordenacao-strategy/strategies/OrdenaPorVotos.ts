import { AlgoritmoOrdenacao } from '../interfaces/algoritmo-ordenacao.interface';
import { TopicoFeed } from '../models/topico-feed.model';

export class OrdenaPorVotos implements AlgoritmoOrdenacao {
  ordenar(lista: TopicoFeed[]): TopicoFeed[] {
    return lista.sort((a, b) => b.votos - a.votos);
  }
}
