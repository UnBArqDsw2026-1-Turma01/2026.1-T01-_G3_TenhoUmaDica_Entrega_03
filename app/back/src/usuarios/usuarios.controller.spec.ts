import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { CriarAlunoDto } from './dtos/alunoDto';
import { CriarAdministradorDto } from './dtos/admnistradorDto';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let usuariosService: jest.Mocked<UsuariosService>;

  beforeEach(async () => {
    const mockUsuariosService = {
      registrarNovoAluno: jest.fn(),
      registrarNovoAdmnistrador: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [{ provide: UsuariosService, useValue: mockUsuariosService }],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    usuariosService = module.get<UsuariosService>(
      UsuariosService,
    ) as jest.Mocked<UsuariosService>;
  });

  describe('registrarAluno', () => {
    const alunoDto: CriarAlunoDto = {
      nome: 'João Silva',
      email: 'joao@teste.com',
      senha: 'senha123',
      matricula: '202012345',
      semestreAtual: 3,
    };

    it('deve chamar service com os dados do DTO', async () => {
      usuariosService.registrarNovoAluno.mockResolvedValue({} as any);

      await controller.registrarAluno(alunoDto);

      expect(usuariosService.registrarNovoAluno).toHaveBeenCalledWith(alunoDto);
      expect(usuariosService.registrarNovoAluno).toHaveBeenCalledTimes(1);
    });

    it('deve retornar mensagem de sucesso e dados do aluno criado', async () => {
      const alunoCriado = { uid: 'uid-aluno-1', nome: alunoDto.nome, email: alunoDto.email };
      usuariosService.registrarNovoAluno.mockResolvedValue(alunoCriado as any);

      const result = await controller.registrarAluno(alunoDto);

      expect(result).toEqual({
        mensagem: 'Aluno registrado com sucesso!',
        dados: alunoCriado,
      });
    });

    it('deve propagar BadRequestException quando service falha por email duplicado', async () => {
      usuariosService.registrarNovoAluno.mockRejectedValue(
        new BadRequestException('Email já cadastrado'),
      );

      await expect(controller.registrarAluno(alunoDto)).rejects.toThrow(BadRequestException);
    });

    it('deve propagar InternalServerErrorException em falha crítica', async () => {
      usuariosService.registrarNovoAluno.mockRejectedValue(
        new InternalServerErrorException('Erro fatal de consistência no banco de dados.'),
      );

      await expect(controller.registrarAluno(alunoDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('deve retornar os dados exatos retornados pelo service', async () => {
      const alunoCriado = {
        uid: 'uid-abc',
        nome: 'João Silva',
        email: 'joao@teste.com',
        matricula: '202012345',
        semestreAtual: 3,
      };
      usuariosService.registrarNovoAluno.mockResolvedValue(alunoCriado as any);

      const result = await controller.registrarAluno(alunoDto);

      expect(result.dados).toStrictEqual(alunoCriado);
    });
  });

  describe('registrarNovoAdmnistrador', () => {
    const adminDto: CriarAdministradorDto = {
      nome: 'Admin Test',
      email: 'admin@teste.com',
      senha: 'admin123',
    };

    it('deve chamar service com os dados do DTO', async () => {
      usuariosService.registrarNovoAdmnistrador.mockResolvedValue({} as any);

      await controller.registrarNovoAdmnistrador(adminDto);

      expect(usuariosService.registrarNovoAdmnistrador).toHaveBeenCalledWith(adminDto);
      expect(usuariosService.registrarNovoAdmnistrador).toHaveBeenCalledTimes(1);
    });

    it('deve retornar mensagem de sucesso e dados do administrador criado', async () => {
      const adminCriado = { uid: 'uid-admin-1', nome: adminDto.nome, email: adminDto.email };
      usuariosService.registrarNovoAdmnistrador.mockResolvedValue(adminCriado as any);

      const result = await controller.registrarNovoAdmnistrador(adminDto);

      expect(result).toEqual({
        mensagem: 'Admnistrador registrado com sucesso!',
        dados: adminCriado,
      });
    });

    it('deve propagar BadRequestException quando service falha', async () => {
      usuariosService.registrarNovoAdmnistrador.mockRejectedValue(
        new BadRequestException('Erro ao criar admin'),
      );

      await expect(controller.registrarNovoAdmnistrador(adminDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('deve propagar InternalServerErrorException em falha crítica', async () => {
      usuariosService.registrarNovoAdmnistrador.mockRejectedValue(
        new InternalServerErrorException('Erro fatal de consistência no banco de dados.'),
      );

      await expect(controller.registrarNovoAdmnistrador(adminDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('deve retornar os dados exatos retornados pelo service', async () => {
      const adminCriado = {
        uid: 'uid-xyz',
        nome: 'Admin Test',
        email: 'admin@teste.com',
        statusAtivo: true,
      };
      usuariosService.registrarNovoAdmnistrador.mockResolvedValue(adminCriado as any);

      const result = await controller.registrarNovoAdmnistrador(adminDto);

      expect(result.dados).toStrictEqual(adminCriado);
    });
  });
});
