import { Comentario } from './Comentario';
import { PostConteudo } from './PostConteudo';

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