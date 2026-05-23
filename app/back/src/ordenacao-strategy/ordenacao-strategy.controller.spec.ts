import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrdenacaoStrategyController } from './ordenacao-strategy.controller';
import { OrdenacaoStrategyService } from './ordenacao-strategy.service';
import { TopicoFeed } from './models/topico-feed.model';

describe('OrdenacaoStrategyController', () => {
  let controller: OrdenacaoStrategyController;
  let service: OrdenacaoStrategyService;

  const mockTopicos: TopicoFeed[] = [
    { id: 1, votos: 15, dataCriacao: '2026-05-10T10:00:00Z' },
    { id: 2, votos: 105, dataCriacao: '2026-05-15T14:30:00Z' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenacaoStrategyController],
      providers: [
        {
          provide: OrdenacaoStrategyService,
          useValue: {
            ordenar: jest.fn(),
            listarAlgoritmos: jest.fn().mockReturnValue(['votos', 'data', 'relevancia']),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdenacaoStrategyController>(OrdenacaoStrategyController);
    service = module.get<OrdenacaoStrategyService>(OrdenacaoStrategyService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  // ── GET /feed/algoritmos ──────────────────────────────────────────

  describe('GET /feed/algoritmos', () => {
    it('retorna lista de algoritmos disponíveis', () => {
      const resultado = controller.listarAlgoritmos();
      expect(resultado).toEqual(['votos', 'data', 'relevancia']);
    });

    it('delega ao service exatamente uma vez', () => {
      controller.listarAlgoritmos();
      expect(service.listarAlgoritmos).toHaveBeenCalledTimes(1);
    });
  });

  // ── POST /feed/ordenar ────────────────────────────────────────────

  describe('POST /feed/ordenar', () => {
    it('delega ao service com os parâmetros corretos', () => {
      const topicoOrdenado = [mockTopicos[1], mockTopicos[0]];
      jest.spyOn(service, 'ordenar').mockReturnValue(topicoOrdenado);

      const resultado = controller.ordenar({ topicos: mockTopicos, algoritmo: 'votos' });

      expect(service.ordenar).toHaveBeenCalledWith(mockTopicos, 'votos');
      expect(resultado).toEqual(topicoOrdenado);
    });

    it('retorna o resultado do service sem modificação', () => {
      const topicoOrdenado = [mockTopicos[1], mockTopicos[0]];
      jest.spyOn(service, 'ordenar').mockReturnValue(topicoOrdenado);

      const resultado = controller.ordenar({ topicos: mockTopicos, algoritmo: 'data' });

      expect(resultado).toBe(topicoOrdenado);
    });

    it('propaga BadRequestException do service', () => {
      jest.spyOn(service, 'ordenar').mockImplementation(() => {
        throw new BadRequestException('Algoritmo inválido');
      });

      expect(() =>
        controller.ordenar({ topicos: mockTopicos, algoritmo: 'invalido' as any }),
      ).toThrow(BadRequestException);
    });
  });
});
