import { ThreadComentario } from './thread-comentario.model';
import { Comentario } from './comentario.model';

describe('ThreadComentario (Composite)', () => {
  let thread: ThreadComentario;
  let comentario1: Comentario;
  let comentario2: Comentario;

  beforeEach(() => {
    thread = new ThreadComentario();
    comentario1 = new Comentario('primeira resposta', 'user-1');
    comentario2 = new Comentario('segunda resposta', 'user-2');
  });

  it('deve iniciar sem respostas', () => {
    expect(thread.getRespostas()).toHaveLength(0);
  });

  it('adicionarResposta deve incluir o componente na lista', () => {
    thread.adicionarResposta(comentario1);
    expect(thread.getRespostas()).toHaveLength(1);
    expect(thread.getRespostas()[0]).toBe(comentario1);
  });

  it('removerResposta deve excluir o componente da lista', () => {
    thread.adicionarResposta(comentario1);
    thread.adicionarResposta(comentario2);
    thread.removerResposta(comentario1);
    expect(thread.getRespostas()).toHaveLength(1);
    expect(thread.getRespostas()[0]).toBe(comentario2);
  });

  it('removerResposta com componente inexistente não deve alterar a lista', () => {
    thread.adicionarResposta(comentario1);
    thread.removerResposta(comentario2);
    expect(thread.getRespostas()).toHaveLength(1);
  });

  it('exibir deve incluir o conteúdo de todos os filhos', () => {
    thread.adicionarResposta(comentario1);
    thread.adicionarResposta(comentario2);
    const resultado = thread.exibir();
    expect(resultado).toContain('primeira resposta');
    expect(resultado).toContain('segunda resposta');
  });

  it('deve suportar threads aninhadas (recursividade)', () => {
    const subThread = new ThreadComentario();
    const subComentario = new Comentario('resposta aninhada', 'user-3');
    subThread.adicionarResposta(subComentario);
    thread.adicionarResposta(comentario1);
    thread.adicionarResposta(subThread);

    const resultado = thread.exibir();
    expect(resultado).toContain('primeira resposta');
    expect(resultado).toContain('resposta aninhada');
  });

  it('toJSON deve serializar as respostas corretamente', () => {
    thread.adicionarResposta(comentario1);
    const json = thread.toJSON() as any;
    expect(json.respostas).toHaveLength(1);
    expect(json.respostas[0].texto).toBe('primeira resposta');
  });
});
