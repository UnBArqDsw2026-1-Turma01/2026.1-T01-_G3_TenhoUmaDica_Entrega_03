import { Avaliacao } from './Avaliacao';
import { ProfessorReal } from './ProfessorReal';

const avaliacao1 = new Avaliacao('uuid-1', 5, 5, 5, 'Excelente didática!', new Date());
const avaliacao2 = new Avaliacao('uuid-2', 4, 3, 3.5, 'Domina o assunto, mas a prova é difícil.', new Date());
const avaliacao3 = new Avaliacao('uuid-3', 5, 4, 4.5, 'Ótima professora.', new Date());

const professoraMilene = new ProfessorReal('api-unb-123', 'Professor', [avaliacao1, avaliacao2, avaliacao3]);

console.log(`Teste da Lógica Base do ProfessorReal`);
console.log(`Nome: ${professoraMilene.getNome()}`);
console.log(`ID API: ${professoraMilene.getIdAPIExterna()}`);

const media = professoraMilene.getMediaAvaliacao();

console.log(`Média Calculada: ${media.toFixed(2)}`);