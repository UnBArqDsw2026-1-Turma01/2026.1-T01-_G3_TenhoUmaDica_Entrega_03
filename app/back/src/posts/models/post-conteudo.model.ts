import { randomUUID } from 'crypto';
import { Post } from '../interfaces/post.interface';
import { Usuario } from '../../usuarios/models/usuario';

export class PostConteudo implements Post {
  protected id: string;
  protected texto: string;
  protected descricao: string;
  protected dataCriacao: Date;
  protected contadorCurtida: number;
  protected idCriador: Usuario;
  protected fixado: boolean;

  constructor(texto: string, descricao: string, idCriador: Usuario) {
    this.id = randomUUID();
    this.texto = texto;
    this.descricao = descricao;
    this.dataCriacao = new Date();
    this.contadorCurtida = 0;
    this.idCriador = idCriador;
    this.fixado = false;
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

  public fixar(usuarioTentandoFixar: Usuario): void {
    const ehModerador = 
      usuarioTentandoFixar.email.includes('admin') || 
      usuarioTentandoFixar.email.includes('moderador') ||
      usuarioTentandoFixar.nome.toLowerCase().includes('moderador');

    if (!ehModerador) {
      console.log(`[ACESSO NEGADO] O usuário ${usuarioTentandoFixar.nome} não tem permissão para fixar este post.`);
      return; 
    }

    this.fixado = true;
    console.log(`[POST FIXADO] O post ${this.id} foi fixado por ${usuarioTentandoFixar.nome}`);
  }

  public desfixar(usuarioTentandoFixar: Usuario): void {
    if (!usuarioTentandoFixar.email.includes('admin') && !usuarioTentandoFixar.email.includes('moderador')) {
      return;
    }
    this.fixado = false;
    console.log(`[POST DESFIXADO] O post ${this.id} foi desfixado.`);
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
