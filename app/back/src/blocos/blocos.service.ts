import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BlocoLista } from './BlocoLista';
import { BlocoTexto } from './BlocoTexto';
import { BlocoCodigo } from './BlocoCodigo';
import { BlocoEquacao } from './BlocoEquacao';
import { CriarBlocoTextoDto } from './dtos/bloco-texto.dto';
import { CriarBlocoCodigoDto } from './dtos/bloco-codigo.dto';
import { CriarBlocoEquacaoDto } from './dtos/bloco-equacao.dto';

interface ListaEntry {
  id: string;
  lista: BlocoLista;
  blocos: Array<{ tipo: string; preview: string }>;
}

@Injectable()
export class BlocosService {
  private readonly listas = new Map<string, ListaEntry>();

  criarLista(): object {
    const id = randomUUID();
    this.listas.set(id, { id, lista: new BlocoLista(), blocos: [] });
    return { id, blocoCount: 0, markdown: '' };
  }

  adicionarTexto(id: string, dto: CriarBlocoTextoDto): object {
    const entry = this.getEntry(id);
    const bloco = new BlocoTexto(dto.texto, dto.tipo);
    entry.lista.adicionarBloco(bloco);
    entry.blocos.push({ tipo: 'texto', preview: dto.texto });
    return this.renderizar(id);
  }

  adicionarCodigo(id: string, dto: CriarBlocoCodigoDto): object {
    const entry = this.getEntry(id);
    const bloco = new BlocoCodigo(dto.texto, dto.linguagem);
    entry.lista.adicionarBloco(bloco);
    entry.blocos.push({
      tipo: 'codigo',
      preview: `[${dto.linguagem}] ${dto.texto.slice(0, 40)}`,
    });
    return this.renderizar(id);
  }

  adicionarEquacao(id: string, dto: CriarBlocoEquacaoDto): object {
    const entry = this.getEntry(id);
    const bloco = new BlocoEquacao(dto.texto);
    entry.lista.adicionarBloco(bloco);
    entry.blocos.push({ tipo: 'equacao', preview: dto.texto });
    return this.renderizar(id);
  }

  renderizar(id: string): object {
    const entry = this.getEntry(id);
    return {
      id: entry.id,
      blocoCount: entry.blocos.length,
      blocos: entry.blocos,
      markdown: entry.lista.exibir(),
    };
  }

  private getEntry(id: string): ListaEntry {
    const entry = this.listas.get(id);
    if (!entry) throw new NotFoundException(`Lista ${id} não encontrada`);
    return entry;
  }
}
