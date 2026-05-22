import { PostConteudo } from '../models/post-conteudo.model';
import { Usuario } from '../../usuarios/usuario.model';

export abstract class FabricaConteudo {
  abstract criarPost(texto: string, descricao: string, criador: Usuario): PostConteudo;

  renderizar(texto: string, descricao: string, criador: Usuario): void {
    const post = this.criarPost(texto, descricao, criador);
    post.renderizar();
  }
}
