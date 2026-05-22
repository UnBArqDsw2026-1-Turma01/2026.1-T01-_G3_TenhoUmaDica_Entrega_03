// PARA MOSTRAR A ORDENAÇÃO FUNCIONANDO, FAÇA npx ts-node teste.ts AQUI

import { TopicoFeed } from './AlgoritmoOrdenacao';
import { OrdenaPorVotos } from './OrdenaPorVotos';
import { OrdenaPorData } from './OrdenaPorData';


const mockTopicos: TopicoFeed[] = [
  { id: 1, titulo: 'Melhor RU da UnB?', votos: 15, dataCriacao: '2026-05-10T10:00:00Z' },
  { id: 2, titulo: 'Vaga de Estágio Backend', votos: 105, dataCriacao: '2026-05-15T14:30:00Z' }, // Mais Votado
  { id: 3, titulo: 'Dúvida com Teclado Mecânico', votos: 3, dataCriacao: '2026-05-21T18:00:00Z' }, // Mais Recente (Hoje)
  { id: 4, titulo: 'Grupo de Estudos de Compiladores', votos: 42, dataCriacao: '2026-05-01T08:00:00Z' }, // Mais Antigo
];


const ordenadorVotos = new OrdenaPorVotos();
const ordenadorData = new OrdenaPorData();

console.log('=== LISTA ORIGINAL (MOCK) ===');
console.table(mockTopicos, ['id', 'titulo', 'votos', 'dataCriacao']);


const ordenadoPorVotos = ordenadorVotos.ordenar([...mockTopicos]);
console.log('\n=== ORDENADO POR VOTOS (Maior pro menor) ===');
console.table(ordenadoPorVotos, ['id', 'titulo', 'votos', 'dataCriacao']);


const ordenadoPorData = ordenadorData.ordenar([...mockTopicos]);
console.log('\n=== ORDENADO POR DATA (Mais recente primeiro) ===');
console.table(ordenadoPorData, ['id', 'titulo', 'votos', 'dataCriacao']);