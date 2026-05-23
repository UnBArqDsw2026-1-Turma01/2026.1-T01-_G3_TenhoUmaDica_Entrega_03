import { PostsService } from './posts.service';
import { ComentariosService } from '../comentarios/comentarios.service';
import { Usuario } from '../usuarios/models/usuario';

// ==========================================
// 1. PREPARANDO O AMBIENTE (Cozinha e Garçom)
// ==========================================
const comentariosService = new ComentariosService();
const postsService = new PostsService(comentariosService);

// ==========================================
// 2. CRIANDO OS ATORES (Usuários reais da classe)
// ==========================================
const aluno = new Usuario('uid-001', 'João Gabriel', 'joao@aluno.unb.br');
const moderador = new Usuario('uid-999', 'Admin Darcy Ribeiro', 'admin@unb.br');

console.log('INICIANDO TESTE COMPLETO DO ECOSSISTEMA DE POSTS\n');

// ==========================================
// 3. TESTANDO AS FÁBRICAS UMA POR UMA
// ==========================================

console.log('--- 1. TESTANDO CRIAÇÃO DE TÓPICO ---');
const topico = postsService.criarPostTopico(
  'Dúvida cruel em Compiladores!',
  'Alguém sabe como resolver aquele erro de sintaxe no Lexer usando Flex e Bison?',
  aluno
);

console.log('\n--- 2. TESTANDO CRIAÇÃO DE MATERIAL ---');
const material = postsService.criarPostMaterial(
  'Resumo completo de Estrutura de Dados 2',
  'Galera, fiz um PDF com todos os algoritmos de árvores e grafos que caem na prova.',
  aluno
);

console.log('\n--- 3. TESTANDO CRIAÇÃO DE AVALIAÇÃO ---');
const avaliacao = postsService.criarPostAvaliacao(
  'Avaliação: Professor de ED2',
  'Didática excelente, mas as provas de grafos são bem pesadas. Recomendo estudar pelo Cormen.',
  aluno
);

console.log('\n--- 4. TESTANDO CRIAÇÃO DE ANÚNCIO (Sua feature!) ---');
const anuncio = postsService.criarPostAnuncio(
  'Atenção: Prazo de trancamento de matrícula',
  'O prazo final para trancar as disciplinas deste semestre encerra nesta sexta-feira.',
  moderador
);

// ==========================================
// 4. VERIFICANDO O RESULTADO FINAL (Polimorfismo no toJSON)
// ==========================================
console.log('\n==========================================');
console.log('ESTADO FINAL NO BANCO DE DADOS (JSONS):');
console.log('==========================================\n');


const todosOsPosts = postsService.listarPosts();
console.dir(todosOsPosts, { depth: null, colors: true });