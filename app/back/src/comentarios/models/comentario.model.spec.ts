import { Comentario } from './comentario.model';

describe('Comentario (Leaf)', () => {
  let comentario: Comentario;

  beforeEach(() => {
    comentario = new Comentario('texto de teste', 'usuario-123');
  });

  it('deve ser criado com valores iniciais corretos', () => {
    const json = comentario.toJSON();
    expect(json.texto).toBe('texto de teste');
    expect(json.idCriador).toBe('usuario-123');
    expect(json.contadorCurtida).toBe(0);
    expect(json.contadorDislike).toBe(0);
    expect(json.id).toBeDefined();
  });

  it('getId deve retornar o mesmo id do toJSON', () => {
    expect(comentario.getId()).toBe(comentario.toJSON().id);
  });

  it('exibir deve retornar string com id e texto', () => {
    const resultado = comentario.exibir();
    expect(resultado).toContain(comentario.getId());
    expect(resultado).toContain('texto de teste');
  });

  it('editar deve atualizar o texto', () => {
    comentario.editar('novo texto');
    expect(comentario.toJSON().texto).toBe('novo texto');
  });

  it('curtir deve incrementar contadorCurtida', () => {
    comentario.curtir();
    comentario.curtir();
    expect(comentario.toJSON().contadorCurtida).toBe(2);
  });

  it('desgostar deve incrementar contadorDislike', () => {
    comentario.desgostar();
    expect(comentario.toJSON().contadorDislike).toBe(1);
  });
});
