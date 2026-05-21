// O Cliente 

import { BlocoTexto } from './BlocoTexto';
import { BlocoCodigo } from './BlocoCodigo';
import { BlocoEquacao } from './BlocoEquacao';
import { BlocoLista } from './BlocoLista';

class BlockManager {
    public static main(): void {
        console.log("Fórum #TenhoUmaDica: Renderizando Postagem");

        const titulo = new BlocoTexto("Como usar Padrões de Projeto", "titulo 1");
        const introducao = new BlocoTexto("Abaixo temos um exemplo de código e uma equação de complexidade.", "normal");
        const codigo = new BlocoCodigo("console.log('Padrão Composite rodando!');", "typescript");
        const equacao = new BlocoEquacao("O(n) = n^2");

        const postagemCompleta = new BlocoLista();
        postagemCompleta.adicionarBloco(titulo);
        postagemCompleta.adicionarBloco(introducao);
        postagemCompleta.adicionarBloco(codigo);
        postagemCompleta.adicionarBloco(equacao);
        const resultadoHTML = postagemCompleta.exibir();
        
        console.log("\nResultado final do Markdown:");
        console.log(resultadoHTML);
    }
}

BlockManager.main();
