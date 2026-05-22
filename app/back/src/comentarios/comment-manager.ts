import { ComponenteComentario } from './interfaces/componente-comentario.interface';

export class CommentManager {
  private componentes: ComponenteComentario[] = [];

  adicionar(componente: ComponenteComentario): void {
    this.componentes.push(componente);
  }

  remover(componente: ComponenteComentario): void {
    const index = this.componentes.indexOf(componente);
    if (index !== -1) this.componentes.splice(index, 1);
  }

  exibirTodos(): string {
    return this.componentes.map((c) => c.exibir()).join('\n');
  }

  getComponentes(): ComponenteComentario[] {
    return this.componentes;
  }
}
