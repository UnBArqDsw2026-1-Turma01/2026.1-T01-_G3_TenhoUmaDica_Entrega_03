// Representa as fórmulas matemáticas do post

import { ComponenteBloco } from './ComponenteBloco';

export class BlocoEquacao implements ComponenteBloco {
    private texto: string;

    constructor(texto: string) {
        this.texto = texto;
    }

    public exibir(): string {
        return `$$ ${this.texto} $$`;
    }
}