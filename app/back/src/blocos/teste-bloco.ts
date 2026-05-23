import { BlocoLista } from './BlocoLista';
import { BlocoTexto } from './BlocoTexto';
import { BlocoCodigo } from './BlocoCodigo';
import { BlocoEquacao } from './BlocoEquacao';

// Simulando a escrita de um aluno
const postagem = new BlocoLista();

postagem.adicionarBloco(new BlocoTexto("Dica de hoje: Complexidade de Algoritmos", "titulo 1"));
postagem.adicionarBloco(new BlocoTexto("Para quem está estudando estrutura de dados, entender a notação Big O é essencial.", "normal"));

// O aluno cria uma subseção para o exemplo prático
const explicacao = new BlocoLista();
explicacao.adicionarBloco(new BlocoTexto("Exemplo de um loop simples:", "titulo 2"));
explicacao.adicionarBloco(new BlocoCodigo("for (let i = 0; i < n; i++) {\n  console.log(i);\n}", "javascript"));
explicacao.adicionarBloco(new BlocoEquacao("O(n)"));

postagem.adicionarBloco(explicacao);

postagem.adicionarBloco(new BlocoTexto("Espero que essa dica ajude nos estudos!", "normal"));

console.log("--- Visualização do Post do Aluno ---");
console.log(postagem.exibir());