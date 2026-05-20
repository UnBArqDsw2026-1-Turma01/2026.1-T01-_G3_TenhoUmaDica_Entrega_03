import { NotFoundException } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ThreadComentario } from './models/thread-comentario.model';

describe('ComentariosService', () => {
  let service: ComentariosService;
  const POST_ID = 'post-abc';

  beforeEach(() => {
    service = new ComentariosService();
  });

  describe('adicionarComentario', () => {
    it('deve criar e retornar um Comentario', () => {
      const comentario = service.adicionarComentario(POST_ID, 'meu texto', 'user-1');
      expect(comentario.toJSON().texto).toBe('meu texto');
      expect(comentario.toJSON().idCriador).toBe('user-1');
    });

    it('deve aparecer na listagem do post', () => {
      service.adicionarComentario(POST_ID, 'visível', 'user-1');
      const lista = service.listarComentariosJSON(POST_ID);
      expect(lista).toHaveLength(1);
    });

    it('posts diferentes não compartilham comentários', () => {
      service.adicionarComentario('post-1', 'do post 1', 'user-1');
      service.adicionarComentario('post-2', 'do post 2', 'user-2');
      expect(service.listarComentariosJSON('post-1')).toHaveLength(1);
      expect(service.listarComentariosJSON('post-2')).toHaveLength(1);
    });
  });

  describe('adicionarResposta', () => {
    it('deve criar uma ThreadComentario ao responder um Comentario simples', () => {
      const pai = service.adicionarComentario(POST_ID, 'comentário pai', 'user-1');
      service.adicionarResposta(POST_ID, pai.getId(), 'resposta', 'user-2');

      const lista = service.listarComentariosJSON(POST_ID);
      // O comentário pai foi substituído por uma Thread
      expect(lista).toHaveLength(1);
      expect((lista[0] as any).respostas).toBeDefined();
      expect((lista[0] as any).respostas).toHaveLength(2);
    });

    it('respostas adicionais ao mesmo pai devem ser agregadas na mesma Thread', () => {
      const pai = service.adicionarComentario(POST_ID, 'pai', 'user-1');
      service.adicionarResposta(POST_ID, pai.getId(), 'resposta 1', 'user-2');
      service.adicionarResposta(POST_ID, pai.getId(), 'resposta 2', 'user-3');

      const lista = service.listarComentariosJSON(POST_ID);
      expect(lista).toHaveLength(1);
      expect((lista[0] as any).respostas).toHaveLength(3);
    });

    it('deve lançar NotFoundException para comentarioPaiId inexistente', () => {
      expect(() =>
        service.adicionarResposta(POST_ID, 'id-inexistente', 'resposta', 'user-1'),
      ).toThrow(NotFoundException);
    });

    it('deve suportar resposta de resposta (recursividade)', () => {
      const pai = service.adicionarComentario(POST_ID, 'pai', 'user-1');
      const resposta = service.adicionarResposta(POST_ID, pai.getId(), 'filho', 'user-2');
      service.adicionarResposta(POST_ID, resposta.getId(), 'neto', 'user-3');

      // Pai virou thread com 2 filhos; filho virou thread com 2 filhos
      const lista = service.listarComentariosJSON(POST_ID);
      expect(lista).toHaveLength(1);
    });
  });

  describe('listarComentariosJSON', () => {
    it('deve retornar lista vazia para post sem comentários', () => {
      expect(service.listarComentariosJSON('post-vazio')).toEqual([]);
    });

    it('deve retornar múltiplos comentários na ordem de criação', () => {
      service.adicionarComentario(POST_ID, 'primeiro', 'u1');
      service.adicionarComentario(POST_ID, 'segundo', 'u2');
      const lista = service.listarComentariosJSON(POST_ID);
      expect(lista).toHaveLength(2);
      expect((lista[0] as any).texto).toBe('primeiro');
      expect((lista[1] as any).texto).toBe('segundo');
    });
  });
});
