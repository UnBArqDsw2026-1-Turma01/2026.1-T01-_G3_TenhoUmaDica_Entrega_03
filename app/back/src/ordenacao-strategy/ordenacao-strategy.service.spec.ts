import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrdenacaoStrategyService } from './ordenacao-strategy.service';
import { TopicoFeed } from './models/topico-feed.model';

describe('OrdenacaoStrategyService', () => {
  let service: OrdenacaoStrategyService;

  const mockTopicos: TopicoFeed[] = [
    { id: 1, titulo: 'Post A', votos: 15, dataCriacao: '2026-05-10T10:00:00Z' },
    { id: 2, titulo: 'Post B', votos: 105, dataCriacao: '2026-05-15T14:30:00Z' },
    { id: 3, titulo: 'Post C', votos: 3, dataCriacao: '2026-05-21T18:00:00Z' },
    { id: 4, titulo: 'Post D', votos: 42, dataCriacao: '2026-05-01T08:00:00Z' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenacaoStrategyService],
    }).compile();

    service = module.get<OrdenacaoStrategyService>(OrdenacaoStrategyService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  // ── ordenar por votos ─────────────────────────────────────────────

  describe('ordenar por votos', () => {
    it('retorna lista do maior para o menor número de votos', () => {
      const resultado = service.ordenar(mockTopicos, 'votos');
      const votos = resultado.map((t) => t.votos);
      expect(votos).toEqual([105, 42, 15, 3]);
    });

    it('mantém todos os elementos após a ordenação', () => {
      const resultado = service.ordenar(mockTopicos, 'votos');
      expect(resultado).toHaveLength(mockTopicos.length);
    });
  });

  // ── ordenar por data ──────────────────────────────────────────────

  describe('ordenar por data', () => {
    it('o primeiro elemento é o tópico mais recente', () => {
      const resultado = service.ordenar(mockTopicos, 'data');
      expect(resultado[0].id).toBe(3); // Post C — 2026-05-21
    });

    it('as datas estão em ordem decrescente', () => {
      const resultado = service.ordenar(mockTopicos, 'data');
      const datas = resultado.map((t) => new Date(t.dataCriacao).getTime());
      for (let i = 0; i < datas.length - 1; i++) {
        expect(datas[i]).toBeGreaterThanOrEqual(datas[i + 1]);
      }
    });
  });

  // ── ordenar por relevancia ────────────────────────────────────────

  describe('ordenar por relevancia', () => {
    it('post com mais votos e mais recente fica à frente de post antigo com mesmos votos', () => {
      const agora = new Date();
      const treHorasAtras = new Date(agora.getTime() - 3 * 3600_000).toISOString();
      const dezHorasAtras = new Date(agora.getTime() - 10 * 3600_000).toISOString();

      const topicos: TopicoFeed[] = [
        { id: 'A', votos: 10, dataCriacao: dezHorasAtras }, // 10/(10+2) ≈ 0.83
        { id: 'B', votos: 10, dataCriacao: treHorasAtras }, // 10/(3+2)  = 2.0
      ];

      const resultado = service.ordenar(topicos, 'relevancia');
      expect(resultado[0].id).toBe('B');
    });

    it('post antigo com muitos votos pode superar post recente com poucos votos', () => {
      const agora = new Date();
      const umHoraAtras = new Date(agora.getTime() - 1 * 3600_000).toISOString();
      const cemHorasAtras = new Date(agora.getTime() - 100 * 3600_000).toISOString();

      const topicos: TopicoFeed[] = [
        { id: 'recente', votos: 1, dataCriacao: umHoraAtras },     // 1/3   ≈ 0.33
        { id: 'antigo', votos: 1000, dataCriacao: cemHorasAtras }, // 1000/102 ≈ 9.8
      ];

      const resultado = service.ordenar(topicos, 'relevancia');
      expect(resultado[0].id).toBe('antigo');
    });
  });

  // ── algoritmo inválido ────────────────────────────────────────────

  describe('algoritmo inválido', () => {
    it('lança BadRequestException', () => {
      expect(() => service.ordenar(mockTopicos, 'invalido')).toThrow(BadRequestException);
    });

    it('mensagem de erro menciona os algoritmos válidos', () => {
      expect(() => service.ordenar(mockTopicos, 'xpto')).toThrow(
        'votos, data ou relevancia',
      );
    });
  });

  // ── imutabilidade ─────────────────────────────────────────────────

  describe('imutabilidade', () => {
    it('não muta a lista original passada como argumento', () => {
      const topicos: TopicoFeed[] = [
        { id: 1, votos: 5, dataCriacao: '2026-01-01' },
        { id: 2, votos: 100, dataCriacao: '2026-01-02' },
      ];
      const idOriginalPrimeiro = topicos[0].id;

      service.ordenar(topicos, 'votos');

      expect(topicos[0].id).toBe(idOriginalPrimeiro);
    });
  });

  // ── listarAlgoritmos ──────────────────────────────────────────────

  describe('listarAlgoritmos', () => {
    it('retorna os três algoritmos disponíveis', () => {
      const algoritmos = service.listarAlgoritmos();
      expect(algoritmos).toEqual(expect.arrayContaining(['votos', 'data', 'relevancia']));
    });

    it('retorna exatamente 3 algoritmos', () => {
      expect(service.listarAlgoritmos()).toHaveLength(3);
    });
  });
});
