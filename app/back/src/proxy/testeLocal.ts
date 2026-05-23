import { Avaliacao } from './Avaliacao';
import { ProfessorService } from './ProfessorService';

const avaliacao1 = new Avaliacao('uuid-1', 5, 5, 5, 'Excelente didatica!', new Date());
const avaliacao2 = new Avaliacao('uuid-2', 4, 3, 3.5, 'Domina o assunto, mas a prova e dificil.', new Date());
const avaliacao3 = new Avaliacao('uuid-3', 5, 4, 4.5, 'Otima professora.', new Date());

const service = new ProfessorService();

service.cadastrarProfessor('api-unb-123', 'Milene Serrano', [avaliacao1, avaliacao2, avaliacao3]);

console.log('=== TESTE DO PADRAO PROXY ===\n');

const professora = service.getProfessor('api-unb-123');

console.log(`Buscando dados da Professora: ${professora.getNome()}`);
console.log(`ID na API: ${professora.getIdAPIExterna()}\n`);

console.log('>> Solicitando media pela primeira vez:');
console.log(`Media Retornada: ${professora.getMediaAvaliacao().toFixed(2)}\n`);

console.log('>> Solicitando media pela segunda vez:');
console.log(`Media Retornada: ${professora.getMediaAvaliacao().toFixed(2)}\n`);

console.log('>> Solicitando media pela terceira vez:');
console.log(`Media Retornada: ${professora.getMediaAvaliacao().toFixed(2)}\n`);