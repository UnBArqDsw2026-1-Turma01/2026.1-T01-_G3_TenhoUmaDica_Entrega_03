// Representa os blocos que contêm trechos de código

import { ComponenteBloco } from './ComponenteBloco';

export class BlocoCodigo implements ComponenteBloco {
    private texto: string;
    private linguagem: string;

    constructor(texto: string, linguagem: string) {
        this.texto = texto;
        this.linguagem = linguagem;
    }

    public exibir(): string {
        return `\`\`\`${this.linguagem}\n${this.texto}\n\`\`\``;
    }
}