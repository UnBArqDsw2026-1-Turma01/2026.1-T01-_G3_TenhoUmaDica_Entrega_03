import { CommentManager } from './comment-manager';
import { Comentario } from './models/comentario.model';
import { ThreadComentario } from './models/thread-comentario.model';

describe('CommentManager', () => {
  let manager: CommentManager;

  beforeEach(() => {
    manager = new CommentManager();
  });

  it('deve iniciar sem componentes', () => {
    expect(manager.getComponentes()).toHaveLength(0);
  });

  it('adicionar deve incluir componentes na lista', () => {
    const c1 = new Comentario('a', 'u1');
    const c2 = new Comentario('b', 'u2');
    manager.adicionar(c1);
    manager.adicionar(c2);
    expect(manager.getComponentes()).toHaveLength(2);
  });

  it('remover deve excluir o componente correto', () => {
    const c1 = new Comentario('a', 'u1');
    const c2 = new Comentario('b', 'u2');
    manager.adicionar(c1);
    manager.adicionar(c2);
    manager.remover(c1);
    expect(manager.getComponentes()).toHaveLength(1);
    expect(manager.getComponentes()[0]).toBe(c2);
  });

  it('exibirTodos deve concatenar o exibir de cada componente', () => {
    const c1 = new Comentario('texto um', 'u1');
    const c2 = new Comentario('texto dois', 'u2');
    manager.adicionar(c1);
    manager.adicionar(c2);
    const resultado = manager.exibirTodos();
    expect(resultado).toContain('texto um');
    expect(resultado).toContain('texto dois');
  });

  it('deve aceitar Leaf e Composite misturados', () => {
    const comentario = new Comentario('folha', 'u1');
    const thread = new ThreadComentario();
    thread.adicionarResposta(new Comentario('dentro da thread', 'u2'));
    manager.adicionar(comentario);
    manager.adicionar(thread);
    expect(manager.getComponentes()).toHaveLength(2);
  });
});
