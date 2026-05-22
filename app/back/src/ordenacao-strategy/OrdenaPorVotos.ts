import { AlgoritmoOrdenacao, TopicoFeed } from './AlgoritmoOrdenacao';

export class OrdenaPorVotos implements AlgoritmoOrdenacao {
  
  ordenar(lista: TopicoFeed[]): TopicoFeed[] {
    // O método sort altera o array original e o retorna.
    // b.votos - a.votos garante a ordem decrescente (do maior pro menor)
    return lista.sort((a, b) => b.votos - a.votos);
  }

}