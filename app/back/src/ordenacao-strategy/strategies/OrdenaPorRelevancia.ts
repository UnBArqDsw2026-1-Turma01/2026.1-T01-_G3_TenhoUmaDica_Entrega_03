import { AlgoritmoOrdenacao } from '../interfaces/algoritmo-ordenacao.interface';
import { TopicoFeed } from '../models/topico-feed.model';

// Relevancia = Votos / (HorasDeExistencia + 2)
export class OrdenaPorRelevancia implements AlgoritmoOrdenacao {
  ordenar(lista: TopicoFeed[]): TopicoFeed[] {
    const agora = new Date().getTime();

    return lista.sort((a, b) => {
      const horasA = (agora - new Date(a.dataCriacao).getTime()) / (1000 * 60 * 60);
      const horasB = (agora - new Date(b.dataCriacao).getTime()) / (1000 * 60 * 60);

      const relevanciaA = a.votos / (horasA + 2);
      const relevanciaB = b.votos / (horasB + 2);

      return relevanciaB - relevanciaA;
    });
  }
}
