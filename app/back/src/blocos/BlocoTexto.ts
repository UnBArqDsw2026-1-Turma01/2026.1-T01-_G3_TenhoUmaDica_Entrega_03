// Representa os blocos de texto simples

import { ComponenteBloco } from './ComponenteBloco';

export class BlocoTexto implements ComponenteBloco {
    private texto: string;
    private tipo: string;

    constructor(texto: string, tipo: string) {
        this.texto = texto;
        this.tipo = tipo;
    }

    public exibir(): string {
        if (this.tipo === 'titulo 1') {
            return `# ${this.texto}`;
        } else if (this.tipo === 'citacao') {
            return `> ${this.texto}`;
        }
        return this.texto;
    }
}