// Para rodar a demo manualmente: npx ts-node --project tsconfig.json src/observer/teste.ts

import { PostConteudo } from './PostConteudo';
import { Comentario } from './Comentario';
import { Usuario } from './Usuario';

console.log('=== OBSERVER — Demo do Padrão ===\n');

// Subject (Notificavel)
const post = new PostConteudo(
  'Como usar padrões GoF?',
  'Discussão sobre padrões de projeto',
);

// Observers (usuários que seguem o post)
const joao = new Usuario('João', 'joao@unb.br');
const maria = new Usuario('Maria', 'maria@unb.br');

console.log('--- Registrando observadores no post ---');
post.adicionarObservador(joao);
post.adicionarObservador(maria);

console.log('\n--- Evento 1: Novo comentário adicionado ---');
const comentario = new Comentario('Ótima pergunta! Composite é muito útil.');
post.adicionarComentario(comentario);

console.log('\n--- Evento 2: Post recebe upvote ---');
post.addCurtida();

console.log('\n--- Evento 3: Comentário recebe resposta ---');
const comentario2 = new Comentario('Concordo! Observer também.');
comentario.adicionarObservador(joao);
comentario.responder(comentario2);

console.log('\n--- Removendo Maria dos observadores ---');
post.removerObservador(maria);

console.log('\n--- Evento 4: Outro upvote (só João recebe) ---');
post.addCurtida();

console.log('\n=== Notificações recebidas por João ===');
console.table(joao.notificacoesRecebidas.map((n) => ({ tipo: n.tipo })));

console.log('\n=== Notificações recebidas por Maria ===');
console.table(maria.notificacoesRecebidas.map((n) => ({ tipo: n.tipo })));
