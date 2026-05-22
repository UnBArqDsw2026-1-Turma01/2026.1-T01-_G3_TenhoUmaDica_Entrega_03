import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('deve retornar "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('loginTest', () => {
    it('deve retornar mensagem com nome e email do usuário autenticado', () => {
      const req = { user: { name: 'João', email: 'joao@example.com' } };
      const result = appController.loginTest(req);
      expect(result).toEqual({
        mensagem:
          'Acesso autorizado, João! O e-mail (joao@example.com) foi validado pelo Firebase Admin.',
      });
    });

    it('deve incluir o nome correto do usuário na mensagem', () => {
      const req = { user: { name: 'Maria', email: 'maria@example.com' } };
      const result = appController.loginTest(req);
      expect(result.mensagem).toContain('Maria');
      expect(result.mensagem).toContain('maria@example.com');
    });
  });
});
