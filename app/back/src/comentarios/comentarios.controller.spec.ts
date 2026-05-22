import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';

describe('ComentariosController', () => {
  let controller: ComentariosController;
  let comentariosService: jest.Mocked<ComentariosService>;

  const POST_ID = 'post-abc';
  const COMENTARIO_ID = 'comentario-xyz';
  const mockUser = { uid: 'user-1' };
  const mockReq = { user: mockUser };

  const mockComentarioJSON = {
    id: COMENTARIO_ID,
    idCriador: mockUser.uid,
    idPostRaiz: POST_ID,
    idComentarioPai: undefined,
    texto: 'Texto do comentário',
    dataCriacao: new Date(),
    contadorCurtida: 0,
    contadorDislike: 0,
    threadComentario: { respostas: [] },
  };

  beforeEach(async () => {
    const mockComentariosService = {
      listarComentariosJSON: jest.fn(),
      adicionarComentario: jest.fn(),
      adicionarResposta: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComentariosController],
      providers: [{ provide: ComentariosService, useValue: mockComentariosService }],
    }).compile();

    controller = module.get<ComentariosController>(ComentariosController);
    comentariosService = module.get<ComentariosService>(
      ComentariosService,
    ) as jest.Mocked<ComentariosService>;
  });

  describe('listar', () => {
    it('deve chamar service com o postId correto', () => {
      comentariosService.listarComentariosJSON.mockReturnValue([]);

      controller.listar(POST_ID);

      expect(comentariosService.listarComentariosJSON).toHaveBeenCalledWith(POST_ID);
      expect(comentariosService.listarComentariosJSON).toHaveBeenCalledTimes(1);
    });

    it('deve retornar array vazio para post sem comentários', () => {
      comentariosService.listarComentariosJSON.mockReturnValue([]);

      expect(controller.listar(POST_ID)).toEqual([]);
    });

    it('deve retornar lista de comentários do post', () => {
      comentariosService.listarComentariosJSON.mockReturnValue([mockComentarioJSON]);

      const result = controller.listar(POST_ID);

      expect(result).toEqual([mockComentarioJSON]);
    });

    it('deve retornar múltiplos comentários', () => {
      const comentarios = [mockComentarioJSON, { ...mockComentarioJSON, id: 'c2' }];
      comentariosService.listarComentariosJSON.mockReturnValue(comentarios);

      const result = controller.listar(POST_ID);

      expect(result).toHaveLength(2);
    });

    it('deve isolar comentários de posts diferentes', () => {
      comentariosService.listarComentariosJSON
        .mockReturnValueOnce([mockComentarioJSON])
        .mockReturnValueOnce([]);

      expect(controller.listar('post-1')).toHaveLength(1);
      expect(controller.listar('post-2')).toHaveLength(0);
    });
  });

  describe('criar', () => {
    it('deve chamar service com postId, texto e uid do usuário', () => {
      const body = { texto: 'Meu comentário' };
      const mockComentario = { toJSON: jest.fn().mockReturnValue(mockComentarioJSON) };
      comentariosService.adicionarComentario.mockReturnValue(mockComentario as any);

      controller.criar(POST_ID, body, mockReq);

      expect(comentariosService.adicionarComentario).toHaveBeenCalledWith(
        POST_ID,
        body.texto,
        mockUser.uid,
      );
    });

    it('deve retornar o JSON do comentário criado', () => {
      const body = { texto: 'Meu comentário' };
      const mockComentario = { toJSON: jest.fn().mockReturnValue(mockComentarioJSON) };
      comentariosService.adicionarComentario.mockReturnValue(mockComentario as any);

      const result = controller.criar(POST_ID, body, mockReq);

      expect(mockComentario.toJSON).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockComentarioJSON);
    });

    it('deve criar comentários em posts diferentes', () => {
      const mockComentario = { toJSON: jest.fn().mockReturnValue(mockComentarioJSON) };
      comentariosService.adicionarComentario.mockReturnValue(mockComentario as any);

      controller.criar('post-1', { texto: 'c1' }, mockReq);
      controller.criar('post-2', { texto: 'c2' }, mockReq);

      expect(comentariosService.adicionarComentario).toHaveBeenNthCalledWith(
        1, 'post-1', 'c1', mockUser.uid,
      );
      expect(comentariosService.adicionarComentario).toHaveBeenNthCalledWith(
        2, 'post-2', 'c2', mockUser.uid,
      );
    });
  });

  describe('responder', () => {
    const respostaJSON = {
      ...mockComentarioJSON,
      id: 'resposta-1',
      idComentarioPai: COMENTARIO_ID,
    };

    it('deve chamar service com postId, comentarioId, texto e uid', () => {
      const body = { texto: 'Minha resposta' };
      const mockResposta = { toJSON: jest.fn().mockReturnValue(respostaJSON) };
      comentariosService.adicionarResposta.mockReturnValue(mockResposta as any);

      controller.responder(POST_ID, COMENTARIO_ID, body, mockReq);

      expect(comentariosService.adicionarResposta).toHaveBeenCalledWith(
        POST_ID,
        COMENTARIO_ID,
        body.texto,
        mockUser.uid,
      );
    });

    it('deve retornar o JSON da resposta criada', () => {
      const body = { texto: 'Minha resposta' };
      const mockResposta = { toJSON: jest.fn().mockReturnValue(respostaJSON) };
      comentariosService.adicionarResposta.mockReturnValue(mockResposta as any);

      const result = controller.responder(POST_ID, COMENTARIO_ID, body, mockReq);

      expect(mockResposta.toJSON).toHaveBeenCalledTimes(1);
      expect(result).toEqual(respostaJSON);
    });

    it('deve propagar NotFoundException quando comentário pai não existe', () => {
      comentariosService.adicionarResposta.mockImplementation(() => {
        throw new NotFoundException(`Comentário ${COMENTARIO_ID} não encontrado`);
      });

      expect(() =>
        controller.responder(POST_ID, COMENTARIO_ID, { texto: 'Resposta' }, mockReq),
      ).toThrow(NotFoundException);
    });

    it('a resposta deve referenciar o comentário pai', () => {
      const mockResposta = { toJSON: jest.fn().mockReturnValue(respostaJSON) };
      comentariosService.adicionarResposta.mockReturnValue(mockResposta as any);

      const result = controller.responder(POST_ID, COMENTARIO_ID, { texto: 'R' }, mockReq) as any;

      expect(result.idComentarioPai).toBe(COMENTARIO_ID);
    });
  });
});
