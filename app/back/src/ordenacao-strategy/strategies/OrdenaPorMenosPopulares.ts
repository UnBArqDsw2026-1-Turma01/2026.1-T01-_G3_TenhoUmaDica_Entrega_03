import { AlgoritmoOrdenacao } from '../interfaces/algoritmo-ordenacao.interface';
import { TopicoFeed } from '../models/topico-feed.model';

export class OrdenaPorMenosPopulares implements AlgoritmoOrdenacao {
  ordenar(lista: TopicoFeed[]): TopicoFeed[] {
    // Ordena de forma crescente (menor número de votos primeiro)
    return lista.sort((a, b) => a.votos - b.votos);
  }
}
