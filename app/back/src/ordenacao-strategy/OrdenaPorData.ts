import { AlgoritmoOrdenacao, TopicoFeed } from './AlgoritmoOrdenacao';

export class OrdenaPorData implements AlgoritmoOrdenacao {
  
  ordenar(lista: TopicoFeed[]): TopicoFeed[] {
    // Transforma a data em milissegundos para o TypeScript conseguir fazer a conta de subtração
    return lista.sort((a, b) => {
      const tempoA = new Date(a.dataCriacao).getTime();
      const tempoB = new Date(b.dataCriacao).getTime();
      
      // tempoB - tempoA garante que o mais recente (maior valor de tempo) fique em primeiro
      return tempoB - tempoA;
    });
  }

}