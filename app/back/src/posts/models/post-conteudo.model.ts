import { randomUUID } from 'crypto';
import { Post } from '../interfaces/post.interface';
import { Usuario } from '../../usuarios/usuario.model';

export class PostConteudo implements Post {
  protected id: string;
  protected texto: string;
  protected descricao: string;
  protected dataCriacao: Date;
  protected contadorCurtida: number;
  protected idCriador: Usuario;

  constructor(texto: string, descricao: string, idCriador: Usuario) {
    this.id = randomUUID();
    this.texto = texto;
    this.descricao = descricao;
    this.dataCriacao = new Date();
    this.contadorCurtida = 0;
    this.idCriador = idCriador;
  }

  postar(): void {
    console.log(`[PostConteudo ${this.id}] postado por ${this.idCriador.nome}`);
  }

  editar(novoTexto: string, novaDescricao: string): void {
    console.log(`[PostConteudo ${this.id}] editado`);
    this.texto = novoTexto;
    this.descricao = novaDescricao;
  }

  deletar(): void {
    console.log(`[PostConteudo ${this.id}] deletado`);
  }

  addCurtida(): void {
    this.contadorCurtida += 1;
    console.log(`[PostConteudo ${this.id}] curtidas: ${this.contadorCurtida}`);
  }

  renderizar(): void {
    console.log(`[PostConteudo ${this.id}] renderizando: "${this.texto}"`);
  }

  clicar(): void {
    console.log(`[PostConteudo ${this.id}] clicado`);
  }

  toJSON() {
    return {
      id: this.id,
      texto: this.texto,
      descricao: this.descricao,
      dataCriacao: this.dataCriacao,
      contadorCurtida: this.contadorCurtida,
      idCriador: this.idCriador.id,
    };
  }
}
