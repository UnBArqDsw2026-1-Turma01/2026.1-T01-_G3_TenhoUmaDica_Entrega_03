import { AlgoritmoOrdenacao } from './interfaces/algoritmo-ordenacao.interface';
import { TopicoFeed } from './models/topico-feed.model';

export class Feed {
  private algoritmo: AlgoritmoOrdenacao;
  private topicos: TopicoFeed[];

  constructor(algoritmoInicial: AlgoritmoOrdenacao, topicos: TopicoFeed[]) {
    this.algoritmo = algoritmoInicial;
    this.topicos = topicos;
  }

  public setAlgoritmo(novoAlgoritmo: AlgoritmoOrdenacao): void {
    this.algoritmo = novoAlgoritmo;
  }

  public executarOrdenacao(): TopicoFeed[] {
    return this.algoritmo.ordenar([...this.topicos]);
  }
}
