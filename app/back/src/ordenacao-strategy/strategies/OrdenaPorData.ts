import { AlgoritmoOrdenacao } from '../interfaces/algoritmo-ordenacao.interface';
import { TopicoFeed } from '../models/topico-feed.model';

export class OrdenaPorData implements AlgoritmoOrdenacao {
  ordenar(lista: TopicoFeed[]): TopicoFeed[] {
    return lista.sort((a, b) => {
      const tempoA = new Date(a.dataCriacao).getTime();
      const tempoB = new Date(b.dataCriacao).getTime();
      return tempoB - tempoA;
    });
  }
}
