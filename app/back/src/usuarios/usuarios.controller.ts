import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarAlunoDto } from './dtos/alunoDto';
import { CriarAdministradorDto } from './dtos/admnistradorDto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('aluno')
  async registrarAluno(@Body() dados: CriarAlunoDto) {
    const alunoCriado = await this.usuariosService.registrarNovoAluno(dados);

    return {
      mensagem: 'Aluno registrado com sucesso!',
      dados: alunoCriado,
    };
  }

  @Post('admin')
  async registrarNovoAdmnistrador(@Body() dados: CriarAdministradorDto) {
    const admnistradorCriado =
      await this.usuariosService.registrarNovoAdmnistrador(dados);

    return {
      mensagem: 'Admnistrador registrado com sucesso!',
      dados: admnistradorCriado,
    };
  }
}
