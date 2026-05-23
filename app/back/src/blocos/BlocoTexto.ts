// Representa os blocos de texto simples

import { ComponenteBloco } from './ComponenteBloco';

export enum TipoTexto {
    TITULO_1 = 'titulo 1',
    TITULO_2 = 'titulo 2',
    TITULO_3 = 'titulo 3',
    CITACAO = 'citacao',
    NORMAL = 'normal'
}

export class BlocoTexto implements ComponenteBloco {
    private texto: string;
    private tipo: TipoTexto; 

    constructor(texto: string, tipo: TipoTexto) {
        this.texto = texto;
        this.tipo = tipo;
    }

    public exibir(): string {
        
        if (this.tipo === TipoTexto.TITULO_1) {
            return `# ${this.texto}`;
        } else if (this.tipo === TipoTexto.TITULO_2) {
            return `## ${this.texto}`;
        } else if (this.tipo === TipoTexto.TITULO_3) {
            return `### ${this.texto}`;
        } else if (this.tipo === TipoTexto.CITACAO) {
            return `> ${this.texto}`;
        }

        return this.texto; 
    }
}