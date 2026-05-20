import { Injectable, BadRequestException } from '@nestjs/common';
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
    try {
      const userAuth = await this.auth.createUser({
        email: dados.email,
        password: dados.senha,
        displayName: dados.nome,
      });

      const builder = new AlunoBuilder();
      const aluno = builder
        .setId(userAuth.uid)
        .setNome(dados.nome)
        .setEmail(dados.email)
        .setMatricula(dados.matricula)
        .setSemestreIngressante(dados.semestreIngressante)
        .getResultado();

      await this.db.collection('alunos').doc(userAuth.uid).set(aluno);

      return aluno;
    } catch (error) {
      throw new BadRequestException(`Erro ao criar aluno: \n${error}`);
    }
  }

  public async registrarNovoAdmnistrador(dados: CriarAdministradorDto) {
    try {
      const userAuth = await this.auth.createUser({
        email: dados.email,
        password: dados.senha,
        displayName: dados.nome,
      });

      const builder = new AdministradorBuilder();
      const adminUser = builder
        .setNome(dados.nome)
        .setId(userAuth.uid)
        .setEmail(dados.email)
        .setStatusAtivo(true)
        .getResultado();

      await this.db
        .collection('admnistradores')
        .doc(userAuth.uid)
        .set(adminUser);

      return adminUser;
    } catch (error) {
      throw new BadRequestException(`Erro ao criar admin: \n${error}`);
    }
  }
}
