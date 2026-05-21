import { randomUUID } from 'crypto';
import { ComponenteComentario } from '../interfaces/componente-comentario.interface';
import { ThreadComentario } from './thread-comentario.model';

export class Comentario implements ComponenteComentario {
  private readonly id: string;
  private idCriador: string;
  private texto: string;
  private readonly dataCriacao: Date;
  private contadorCurtida: number;
  private contadorDislike: number;
  private idPostRaiz?: string;
  private threadComentario: ThreadComentario;

  constructor(texto: string, idCriador: string, idPostRaiz?: string) {
    this.id = randomUUID();
    this.texto = texto;
    this.idCriador = idCriador;
    this.dataCriacao = new Date();
    this.contadorCurtida = 0;
    this.contadorDislike = 0;
    this.idPostRaiz = idPostRaiz;
    this.threadComentario = new ThreadComentario();
  }

  getId(): string {
    return this.id;
  }

  adicionarResposta(comentario: Comentario): void {
    this.threadComentario.adicionarResposta(comentario);
  }

  exibir(): string {
    return `[Comentario ${this.id}] "${this.texto}" | +${this.contadorCurtida} -${this.contadorDislike}\n${this.threadComentario.exibir(1)}`;
  }

  editar(novoTexto: string): void {
    console.log(`[Comentario ${this.id}] editado`);
    this.texto = novoTexto;
  }

  deletar(): void {
    console.log(`[Comentario ${this.id}] deletado`);
  }

  curtir(): void {
    this.contadorCurtida += 1;
    console.log(`[Comentario ${this.id}] curtida — total: ${this.contadorCurtida}`);
  }

  desgostar(): void {
    this.contadorDislike += 1;
    console.log(`[Comentario ${this.id}] dislike — total: ${this.contadorDislike}`);
  }

  salvar(): void {
    console.log(`[Comentario ${this.id}] salvo pelo usuário ${this.idCriador}`);
  }

  denunciar(): void {
    console.log(`[Comentario ${this.id}] denunciado`);
  }

  fixar(): void {
    console.log(`[Comentario ${this.id}] fixado`);
  }

  toJSON() {
    return {
      id: this.id,
      idCriador: this.idCriador,
      idPostRaiz: this.idPostRaiz,
      texto: this.texto,
      dataCriacao: this.dataCriacao,
      contadorCurtida: this.contadorCurtida,
      contadorDislike: this.contadorDislike,
      threadComentario: this.threadComentario.toJSON()
    };
  }
}
