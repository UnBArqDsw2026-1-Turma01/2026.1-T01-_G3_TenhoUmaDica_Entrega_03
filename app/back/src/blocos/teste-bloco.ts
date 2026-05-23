import { BlocoLista } from './BlocoLista';
import { BlocoTexto, TipoTexto } from './BlocoTexto'; // Alterado para importar o Enum TipoTexto
import { BlocoCodigo } from './BlocoCodigo';
import { BlocoEquacao } from './BlocoEquacao';

// Simulando a escrita de um aluno
const postagem = new BlocoLista();

// Atualizado para usar TipoTexto.TITULO_1 e TipoTexto.NORMAL
postagem.adicionarBloco(new BlocoTexto("Dica de hoje: Complexidade de Algoritmos", TipoTexto.TITULO_1));
postagem.adicionarBloco(new BlocoTexto("Para quem está estudando estrutura de dados, entender a notação Big O é essencial.", TipoTexto.NORMAL));

// O aluno cria uma subseção para o exemplo prático
const explicacao = new BlocoLista();
// Atualizado para usar TipoTexto.TITULO_2
explicacao.adicionarBloco(new BlocoTexto("Exemplo de um loop simples:", TipoTexto.TITULO_2));
explicacao.adicionarBloco(new BlocoCodigo("for (let i = 0; i < n; i++) {\n   console.log(i);\n}", "javascript"));
explicacao.adicionarBloco(new BlocoEquacao("O(n)"));

postagem.adicionarBloco(explicacao);

// Atualizado para usar TipoTexto.NORMAL
postagem.adicionarBloco(new BlocoTexto("Espero que essa dica ajude nos estudos!", TipoTexto.NORMAL));

console.log("--- Visualização do Post do Aluno ---");
console.log(postagem.exibir());