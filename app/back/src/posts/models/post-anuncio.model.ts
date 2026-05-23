import { PostConteudo } from './post-conteudo.model';
import { Usuario } from '../../usuarios/models/usuario';

export class PostAnuncio extends PostConteudo {
  private comentariosBloqueados: boolean;

  constructor(texto: string, descricao: string, idCriador: Usuario) {

    super(texto, descricao, idCriador); 
    this.comentariosBloqueados = true; 

  }

  public alternarBloqueioComentarios(usuarioTentandoModificar: Usuario): void {

    // reutilização uma lógica de segurança simples baseada no mock de e-mail/nome
    const ehModerador = 
      usuarioTentandoModificar.email.includes('admin') || 
      usuarioTentandoModificar.email.includes('moderador');

    if (!ehModerador) {
      console.log(`[ACESSO NEGADO] ${usuarioTentandoModificar.nome} não pode alterar as permissões de comentários.`);
      return;
    }

    this.comentariosBloqueados = !this.comentariosBloqueados;
    console.log(`[PostAnuncio ${this.id}] Bloqueio de comentários alterado para: ${this.comentariosBloqueados}`);
  }

  
  toJSON(){
  return {
    ...super.toJSON(),
    tipo: 'anuncio',
    comentariosBloqueados: this.comentariosBloqueados,
  };
}

}