import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let postsService: jest.Mocked<PostsService>;

  const mockUser = { uid: 'user-uid-1', name: 'Test User', email: 'test@example.com' };
  const mockReq = { user: mockUser };

  beforeEach(async () => {
    const mockPostsService = {
      listarPosts: jest.fn(),
      criarPostTopico: jest.fn(),
      criarPostMaterial: jest.fn(),
      criarPostAvaliacao: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{ provide: PostsService, useValue: mockPostsService }],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService) as jest.Mocked<PostsService>;
  });

  describe('listar', () => {
    it('deve retornar a lista de posts do service', () => {
      const posts = [{ id: 'p1', texto: 'Post', tipo: 'topico' }];
      postsService.listarPosts.mockReturnValue(posts);

      const result = controller.listar();

      expect(postsService.listarPosts).toHaveBeenCalledTimes(1);
      expect(result).toEqual(posts);
    });

    it('deve retornar array vazio quando não há posts', () => {
      postsService.listarPosts.mockReturnValue([]);

      expect(controller.listar()).toEqual([]);
    });

    it('deve retornar múltiplos posts', () => {
      const posts = [
        { id: 'p1', tipo: 'topico' },
        { id: 'p2', tipo: 'material' },
        { id: 'p3', tipo: 'avaliacao' },
      ];
      postsService.listarPosts.mockReturnValue(posts);

      const result = controller.listar();

      expect(result).toHaveLength(3);
    });
  });

  describe('criarTopico', () => {
    it('deve chamar service com texto, descricao e Usuario criado a partir do req.user', () => {
      const body = { texto: 'Título do tópico', descricao: 'Descrição do tópico' };
      const expectedJSON = { id: 'post-1', tipo: 'topico', idCriador: mockUser.uid };
      const mockPost = { toJSON: jest.fn().mockReturnValue(expectedJSON) };
      postsService.criarPostTopico.mockReturnValue(mockPost as any);

      const result = controller.criarTopico(body, mockReq);

      expect(postsService.criarPostTopico).toHaveBeenCalledWith(
        body.texto,
        body.descricao,
        expect.objectContaining({ id: mockUser.uid, nome: mockUser.name, email: mockUser.email }),
      );
      expect(mockPost.toJSON).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedJSON);
    });

    it('deve construir o Usuario com os dados corretos do token', () => {
      const body = { texto: 'Texto', descricao: 'Desc' };
      postsService.criarPostTopico.mockReturnValue({ toJSON: jest.fn().mockReturnValue({}) } as any);

      controller.criarTopico(body, { user: { uid: 'uid-42', name: 'Alice', email: 'alice@test.com' } });

      const criador = postsService.criarPostTopico.mock.calls[0][2];
      expect(criador.id).toBe('uid-42');
      expect(criador.nome).toBe('Alice');
      expect(criador.email).toBe('alice@test.com');
    });
  });

  describe('criarMaterial', () => {
    it('deve chamar service com texto, descricao e Usuario correto', () => {
      const body = { texto: 'Conteúdo do material', descricao: 'Desc material' };
      const expectedJSON = { id: 'post-2', tipo: 'material', idCriador: mockUser.uid };
      const mockPost = { toJSON: jest.fn().mockReturnValue(expectedJSON) };
      postsService.criarPostMaterial.mockReturnValue(mockPost as any);

      const result = controller.criarMaterial(body, mockReq);

      expect(postsService.criarPostMaterial).toHaveBeenCalledWith(
        body.texto,
        body.descricao,
        expect.objectContaining({ id: mockUser.uid }),
      );
      expect(result).toEqual(expectedJSON);
    });

    it('deve retornar o JSON do post criado', () => {
      const expectedJSON = { id: 'post-2', tipo: 'material' };
      postsService.criarPostMaterial.mockReturnValue({
        toJSON: jest.fn().mockReturnValue(expectedJSON),
      } as any);

      const result = controller.criarMaterial({ texto: 'T', descricao: 'D' }, mockReq);

      expect(result).toBe(expectedJSON);
    });
  });

  describe('criarAvaliacao', () => {
    it('deve chamar service com texto, descricao e Usuario correto', () => {
      const body = { texto: 'Questão da avaliação', descricao: 'Desc avaliação' };
      const expectedJSON = { id: 'post-3', tipo: 'avaliacao', idCriador: mockUser.uid };
      const mockPost = { toJSON: jest.fn().mockReturnValue(expectedJSON) };
      postsService.criarPostAvaliacao.mockReturnValue(mockPost as any);

      const result = controller.criarAvaliacao(body, mockReq);

      expect(postsService.criarPostAvaliacao).toHaveBeenCalledWith(
        body.texto,
        body.descricao,
        expect.objectContaining({ id: mockUser.uid }),
      );
      expect(result).toEqual(expectedJSON);
    });

    it('deve retornar o JSON do post criado', () => {
      const expectedJSON = { id: 'post-3', tipo: 'avaliacao' };
      postsService.criarPostAvaliacao.mockReturnValue({
        toJSON: jest.fn().mockReturnValue(expectedJSON),
      } as any);

      const result = controller.criarAvaliacao({ texto: 'T', descricao: 'D' }, mockReq);

      expect(result).toBe(expectedJSON);
    });
  });
});
