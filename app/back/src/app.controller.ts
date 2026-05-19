import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  @UseGuards(AuthGuard)
  loginTest(@Req() request: any) {
    const nome = request.user.name;
    const email = request.user.email;

    return {
      mensagem: `Acesso autorizado, ${nome}! O e-mail (${email}) foi validado pelo Firebase Admin.`,
    };
  }
}
