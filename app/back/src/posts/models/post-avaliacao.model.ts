import { PostConteudo } from './post-conteudo.model';
import { Usuario } from '../../usuarios/models/usuario';

export class PostAvaliacao extends PostConteudo {
  private avaliacao: number;

  constructor(texto: string, descricao: string, idCriador: Usuario) {
    super(texto, descricao, idCriador);
    this.avaliacao = 0;
  }

  avaliar(nota: number): void {
    console.log(`[PostAvaliacao ${this.id}] avaliação definida: ${nota}`);
    this.avaliacao = nota;
  }

  renderizar(): void {
    console.log(
      `[PostAvaliacao ${this.id}] renderizando com avaliação ${this.avaliacao}`,
    );
  }

  toJSON() {
    return {
      ...super.toJSON(),
      tipo: 'avaliacao',
      avaliacao: this.avaliacao,
    };
  }
}
