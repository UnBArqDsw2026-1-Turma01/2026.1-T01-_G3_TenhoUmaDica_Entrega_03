// O Cliente 

import { BlocoTexto, TipoTexto } from './BlocoTexto';
import { BlocoCodigo } from './BlocoCodigo';
import { BlocoEquacao } from './BlocoEquacao';
import { BlocoLista } from './BlocoLista';

class BlockManager {
    public static main(): void {
        console.log("Fórum #TenhoUmaDica: Renderizando Postagem");

        // Instanciando folhas genéricas, também chamando os tipos de texto definidos com o Enum
        const titulo = new BlocoTexto("Como usar Padrões de Projeto", TipoTexto.TITULO_1);
        const introducao = new BlocoTexto("Abaixo temos um exemplo de código e uma equação de complexidade.", TipoTexto.NORMAL);
        const codigo = new BlocoCodigo("console.log('Padrão Composite rodando!');", "typescript");
        const equacao = new BlocoEquacao("O(n) = n^2");

        // Instanciando o Composite
        const postagemCompleta = new BlocoLista();
        postagemCompleta.adicionarBloco(titulo);
        postagemCompleta.adicionarBloco(introducao);
        postagemCompleta.adicionarBloco(codigo);
        postagemCompleta.adicionarBloco(equacao);
        const resultadoHTML = postagemCompleta.exibir();
        
        // Chamada uniforme
        console.log("\nResultado final do Markdown:");
        console.log(resultadoHTML);
    }
}

BlockManager.main();
