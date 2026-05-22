import { FabricaConteudo } from './fabrica-conteudo.factory';
import { PostMaterial } from '../models/post-material.model';
import { PostConteudo } from '../models/post-conteudo.model';
import { Usuario } from '../../usuarios/models/usuario';

export class FabricaMaterial extends FabricaConteudo {
  criarPost(texto: string, descricao: string, criador: Usuario): PostConteudo {
    return new PostMaterial(texto, descricao, criador);
  }
}
