import { ComponenteComentario } from '../interfaces/componente-comentario.interface';

export class ThreadComentario implements ComponenteComentario {
  private respostas: ComponenteComentario[];

  constructor() {
    this.respostas = [];
  }

  adicionarResposta(c: ComponenteComentario): void {
    this.respostas.push(c);
    console.log(`[ThreadComentario] resposta adicionada — total: ${this.respostas.length}`);
  }

  removerResposta(c: ComponenteComentario): void {
    const index = this.respostas.indexOf(c);
    if (index !== -1) {
      this.respostas.splice(index, 1);
      console.log(`[ThreadComentario] resposta removida — total: ${this.respostas.length}`);
    }
  }

  exibir(nivel = 0): string {
    const indent = '  '.repeat(nivel);
    const linhas = this.respostas.map((r) => {
      if (r instanceof ThreadComentario) {
        return r.exibir(nivel + 1);
      }
      return `${indent}  ${r.exibir()}`;
    });
    return `${indent}[Thread]\n${linhas.join('\n')}`;
  }

  getRespostas(): ComponenteComentario[] {
    return this.respostas;
  }

  toJSON(): object {
    return {
      respostas: this.respostas.map((r) =>
        typeof (r as any).toJSON === 'function' ? (r as any).toJSON() : r,
      ),
    };
  }
}
