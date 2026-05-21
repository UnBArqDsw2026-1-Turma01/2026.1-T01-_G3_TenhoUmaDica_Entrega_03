// Esta é a classe chave do padrão. Ela implementa a interface, mas esconde dentro dela um Array de outros componentes e faz a recursão

import { ComponenteBloco } from './ComponenteBloco';

export class BlocoLista implements ComponenteBloco {
    private blocos: ComponenteBloco[] = [];

    public adicionarBloco(b: ComponenteBloco): void {
        this.blocos.push(b);
    }

    public removerBloco(b: ComponenteBloco): void {
        const index = this.blocos.indexOf(b);
        if (index !== -1) {
            this.blocos.splice(index, 1);
        }
    }

    public exibir(): string {
        let markdownFinal = "";
        for (const bloco of this.blocos) {
            markdownFinal += bloco.exibir() + "\n\n";
        }
        return markdownFinal.trim();
    }
}