import { FabricaConteudo } from './fabrica-conteudo.factory';
import { PostConteudo } from '../models/post-conteudo.model';
import { PostAnuncio } from '../models/post-anuncio.model';
import { Usuario } from '../../usuarios/models/usuario';

export class FabricaAnuncio extends FabricaConteudo {

  public criarPost(texto: string, descricao: string, idCriador: Usuario): PostConteudo {
    return new PostAnuncio(texto, descricao, idCriador);
  }
}