import { FabricaConteudo } from './fabrica-conteudo.factory';
import { PostTopico } from '../models/post-topico.model';
import { PostConteudo } from '../models/post-conteudo.model';
import { Usuario } from '../../usuarios/usuario.model';

export class FabricaTopico extends FabricaConteudo {
  criarPost(texto: string, descricao: string, criador: Usuario): PostConteudo {
    return new PostTopico(texto, descricao, criador);
  }
}
