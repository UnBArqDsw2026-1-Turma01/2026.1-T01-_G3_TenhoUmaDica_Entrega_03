import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token não encontrado ou formato inválido.',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
  }
}
