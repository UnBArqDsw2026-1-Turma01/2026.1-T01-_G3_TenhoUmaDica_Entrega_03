// Context serve para manter uma referência para o objeto Strategy e delegar a execução para ele

import { AlgoritmoOrdenacao, TopicoFeed } from './AlgoritmoOrdenacao';

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