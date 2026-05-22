// A formula para calcular relevancia, com TempoDeExistencia em horas eh:
// Relevancia = Votos/(TempoDeExistencia + 2)
import { AlgoritmoOrdenacao, TopicoFeed } from './AlgoritmoOrdenacao';

export class OrdenaPorRelevancia implements AlgoritmoOrdenacao {
  
  ordenar(lista: TopicoFeed[]): TopicoFeed[] {
    const agora = new Date().getTime();

    return lista.sort((a, b) => {
      const tempoA = new Date(a.dataCriacao).getTime();
      const tempoB = new Date(b.dataCriacao).getTime();

      // calcula o tempo de existência de cada postagem em horas
      const horasDeExistenciaA = (agora - tempoA) / (1000 * 60 * 60);
      const horasDeExistenciaB = (agora - tempoB) / (1000 * 60 * 60);

      // Calcula a relevância votos divididos pelo tempo de existência + 2
      // + 2 serve para evitar divisão por zero e atenuar posts criados ha 1 segundo
      const relevanciaA = a.votos / (horasDeExistenciaA + 2);
      const relevanciaB = b.votos / (horasDeExistenciaB + 2);

      // 3. Ordem decrescente(+ relavente no topo)
      return relevanciaB - relevanciaA;
    });
  }
}
