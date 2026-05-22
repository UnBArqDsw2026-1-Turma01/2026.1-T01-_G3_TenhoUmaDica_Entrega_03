import { Comentario } from './Comentario';
import { PostConteudo } from './PostConteudo';

describe('Observer salvarTopico', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('Comentario', () => {
    it('deve registrar um tópico salvo e refletir isso no toJSON', () => {
      const comentario = new Comentario('comentário de teste');

      comentario.salvarTopico();

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('salvo como tópico'));
      expect((comentario.toJSON() as any).topicosSalvosCount).toBe(1);
    });

    it('deve contabilizar múltiplos salvamentos de tópico', () => {
      const comentario = new Comentario('comentário de teste');

      comentario.salvarTopico();
      comentario.salvarTopico();

      expect((comentario.toJSON() as any).topicosSalvosCount).toBe(2);
    });
  });

  describe('PostConteudo', () => {
    it('deve registrar um tópico salvo e refletir isso no toJSON', () => {
      const post = new PostConteudo('texto do post', 'descrição do post');

      post.salvarTopico();

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('salvo como tópico'));
      expect((post.toJSON() as any).topicosSalvosCount).toBe(1);
    });

    it('deve contabilizar múltiplos salvamentos de tópico', () => {
      const post = new PostConteudo('texto do post', 'descrição do post');

      post.salvarTopico();
      post.salvarTopico();

      expect((post.toJSON() as any).topicosSalvosCount).toBe(2);
    });
  });
});