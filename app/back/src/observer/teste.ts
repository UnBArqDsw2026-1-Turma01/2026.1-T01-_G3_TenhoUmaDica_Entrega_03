// Para rodar a demo manualmente: npx ts-node --project tsconfig.json src/observer/teste.ts
// Para rodar os testes: npx jest src/observer/teste.ts --runInBand

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

describe('salvarTopico', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('Comentario', () => {
    it('deve registrar um tópico salvo e refletir isso no toJSON', () => {
      const comentarioTeste = new Comentario('comentário de teste');

      comentarioTeste.salvarTopico();

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('salvo como tópico'));
      expect((comentarioTeste.toJSON() as any).topicosSalvosCount).toBe(1);
    });

    it('deve contabilizar múltiplos salvamentos de tópico', () => {
      const comentarioTeste = new Comentario('comentário de teste');

      comentarioTeste.salvarTopico();
      comentarioTeste.salvarTopico();

      expect((comentarioTeste.toJSON() as any).topicosSalvosCount).toBe(2);
    });
  });

  describe('PostConteudo', () => {
    it('deve registrar um tópico salvo e refletir isso no toJSON', () => {
      const postTeste = new PostConteudo('texto do post', 'descrição do post');

      postTeste.salvarTopico();

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('salvo como tópico'));
      expect((postTeste.toJSON() as any).topicosSalvosCount).toBe(1);
    });

    it('deve contabilizar múltiplos salvamentos de tópico', () => {
      const postTeste = new PostConteudo('texto do post', 'descrição do post');

      postTeste.salvarTopico();
      postTeste.salvarTopico();

      expect((postTeste.toJSON() as any).topicosSalvosCount).toBe(2);
    });
  });
});
