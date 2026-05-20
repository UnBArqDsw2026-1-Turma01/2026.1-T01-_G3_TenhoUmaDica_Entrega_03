import { PostConteudo } from './post-conteudo.model';
import { Usuario } from '../../usuarios/usuario.model';

export class PostMaterial extends PostConteudo {
  private material: string[];

  constructor(texto: string, descricao: string, idCriador: Usuario) {
    super(texto, descricao, idCriador);
    this.material = [];
  }

  addMaterial(item: string): void {
    console.log(`[PostMaterial ${this.id}] material adicionado: ${item}`);
    this.material.push(item);
  }

  renderizar(): void {
    console.log(`[PostMaterial ${this.id}] renderizando com ${this.material.length} material(is)`);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      tipo: 'material',
      material: this.material,
    };
  }
}
