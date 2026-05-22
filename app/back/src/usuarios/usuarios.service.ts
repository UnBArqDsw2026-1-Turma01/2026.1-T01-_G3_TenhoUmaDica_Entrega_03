import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as admin from 'firebase-admin'; // 1. Importa o Admin SDK
import { AlunoBuilder } from './builders/alunoBuilder';
import { CriarAlunoDto } from './dtos/alunoDto';
import { CriarAdministradorDto } from './dtos/admnistradorDto';
import { AdministradorBuilder } from './builders/admnistradorBuilder';

@Injectable()
export class UsuariosService {
  private auth = admin.auth();
  private db = admin.firestore();

  public async registrarNovoAluno(dados: CriarAlunoDto) {
    let userAuth: admin.auth.UserRecord | undefined;

    try {
      userAuth = await this.auth.createUser({
        email: dados.email,
        password: dados.senha,
        displayName: dados.nome,
      });

      const builder = new AlunoBuilder();
      const aluno = builder
        .setUid(userAuth.uid)
        .setNome(dados.nome)
        .setEmail(dados.email)
        .setMatricula(dados.matricula)
        .setSemestreAtual(dados.semestreAtual)
        .getResultado();

      await this.db
        .collection('alunos')
        .doc(userAuth.uid)
        .set({ ...aluno });

      return aluno;
    } catch (error) {
      if (userAuth && userAuth.uid) {
        try {
          await this.auth.deleteUser(userAuth.uid);
          console.warn(
            `[Rollback Executado] Usuário ${userAuth.uid} deletado devido a falha posterior.`,
          );
        } catch (rollbackError) {
          console.error(
            `[FALHA CRÍTICA] Não foi possível deletar o usuário órfão ${userAuth.uid}. Erro: ${rollbackError}`,
          );
          throw new InternalServerErrorException(
            'Erro fatal de consistência no banco de dados.',
          );
        }
      }

      throw new BadRequestException(`Erro ao criar aluno: ${error}`);
    }
  }

  public async registrarNovoAdmnistrador(dados: CriarAdministradorDto) {
    let userAuth: admin.auth.UserRecord | undefined;

    try {
      userAuth = await this.auth.createUser({
        email: dados.email,
        password: dados.senha,
        displayName: dados.nome,
      });

      const builder = new AdministradorBuilder();
      const adminUser = builder
        .setUid(userAuth.uid)
        .setNome(dados.nome)
        .setEmail(dados.email)
        .setStatusAtivo(true)
        .getResultado();

      await this.db
        .collection('admnistradores')
        .doc(userAuth.uid)
        .set({ ...adminUser });

      return adminUser;
    } catch (error) {
      if (userAuth && userAuth.uid) {
        try {
          await this.auth.deleteUser(userAuth.uid);
          console.warn(
            `[Rollback Executado] Admin ${userAuth.uid} deletado devido a falha posterior.`,
          );
        } catch (rollbackError) {
          console.error(
            `[FALHA CRÍTICA] Não foi possível deletar o admin órfão ${userAuth.uid}. Erro: ${rollbackError}`,
          );
          throw new InternalServerErrorException(
            'Erro fatal de consistência no banco de dados.',
          );
        }
      }

      throw new BadRequestException(`Erro ao criar admin: ${error}`);
    }
  }
}
