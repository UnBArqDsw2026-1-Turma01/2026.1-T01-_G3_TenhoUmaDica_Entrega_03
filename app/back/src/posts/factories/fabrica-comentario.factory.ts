import { FabricaConteudo } from './fabrica-conteudo.factory';
import { PostComentario } from '../models/post-comentario.model';
import { PostConteudo } from '../models/post-conteudo.model';
import { Usuario } from '../../usuarios/usuario.model';

export class FabricaComentario extends FabricaConteudo {
  criarPost(texto: string, descricao: string, criador: Usuario): PostConteudo {
    return new PostComentario(texto, descricao, criador);
  }
}
