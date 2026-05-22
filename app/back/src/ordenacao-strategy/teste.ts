import { TopicoFeed } from './AlgoritmoOrdenacao';
import { Feed } from './Feed';
import { OrdenaPorVotos } from './OrdenaPorVotos';
import { OrdenaPorData } from './OrdenaPorData';
import { OrdenaPorRelevancia } from './OrdenaPorRelevancia';

const mockTopicos: TopicoFeed[] = [
  { id: 1, titulo: 'Melhor RU da UnB?', votos: 15, dataCriacao: '2026-05-10T10:00:00Z' },
  { id: 2, titulo: 'Vaga de Estagio Backend', votos: 105, dataCriacao: '2026-05-15T14:30:00Z' },
  { id: 3, titulo: 'Duvida com Teclado Mecanico', votos: 3, dataCriacao: '2026-05-21T18:00:00Z' },
  { id: 4, titulo: 'Grupo de Estudos de Arquitetura e Desenho de Software', votos: 42, dataCriacao: '2026-05-01T08:00:00Z' },
];

console.log('=== LISTA ORIGINAL (MOCK) ===');
console.table(mockTopicos, ['id', 'titulo', 'votos', 'dataCriacao']);


const meuFeed = new Feed(new OrdenaPorVotos(), mockTopicos);

console.log('\n=== ORDENADO POR VOTOS (Maior pro menor) ===');

console.table(meuFeed.executarOrdenacao(), ['id', 'titulo', 'votos', 'dataCriacao']);

meuFeed.setAlgoritmo(new OrdenaPorData());

console.log('\n=== ORDENADO POR DATA (Mais recente primeiro) ===');
console.table(meuFeed.executarOrdenacao(), ['id', 'titulo', 'votos', 'dataCriacao']);


meuFeed.setAlgoritmo(new OrdenaPorRelevancia());

console.log('\n=== ORDENADO POR RELEVANCIA (Mix de Votos e Data) ===');
console.table(meuFeed.executarOrdenacao(), ['id', 'titulo', 'votos', 'dataCriacao']);