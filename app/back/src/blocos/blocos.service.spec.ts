import { BlocosService } from './blocos.service';
import { NotFoundException } from '@nestjs/common';
import { TipoTexto } from './BlocoTexto'; 

describe('BlocosService - Padrão Composite', () => {
  let service: BlocosService;

  beforeEach(() => {
    service = new BlocosService();
  });

  it('deve compor blocos e retornar o markdown correto', () => {
    const { id } = service.criarLista() as { id: string };

    service.adicionarTexto(id, { texto: 'Título', tipo: TipoTexto.TITULO_1 });
    service.adicionarCodigo(id, { texto: 'console.log("Oi");', linguagem: 'javascript' });

    const resultado = service.renderizar(id) as any;

    expect(resultado.blocoCount).toBe(2);
    expect(resultado.markdown).toContain('# Título');
    expect(resultado.markdown).toContain('```javascript');
    expect(resultado.markdown).toContain('console.log("Oi");');
  });

  it('deve falhar ao tentar adicionar bloco em uma lista inexistente', () => {
    expect(() => {
      service.adicionarTexto('id-invalido', { texto: 'Erro', tipo: TipoTexto.NORMAL });
    }).toThrow(NotFoundException);
  });
});