import { FabricaConteudo } from './fabrica-conteudo.factory';
import { PostAvaliacao } from '../models/post-avaliacao.model';
import { PostConteudo } from '../models/post-conteudo.model';
import { Usuario } from 'src/usuarios/models/usuario';

export class FabricaAvaliacao extends FabricaConteudo {
  criarPost(texto: string, descricao: string, criador: Usuario): PostConteudo {
    return new PostAvaliacao(texto, descricao, criador);
  }
}
