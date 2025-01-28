import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '../env/env.service';
import {
  Encrypter,
  EncryptOptions,
} from 'src/domain/application/cryptography/encrypter';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(
    private jwtService: JwtService,
    private env: EnvService,
  ) {}

  async encrypt<T = Record<string, unknown>>(
    payload: T,
    options?: EncryptOptions,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload as any, {
      ...(options?.expiresIn && {
        expiresIn: this.msToSeconds(options.expiresIn),
      }),
      secret: this.env.get('JWT_SECRET'),
    });
  }

  private msToSeconds(ms: number): number {
    return Math.floor(ms / 1000);
  }

  async decode<T = Record<string, unknown>>(token: string): Promise<T> {
    const secret = this.env.get('JWT_SECRET');

    return (await this.jwtService.verifyAsync(token, {
      secret: secret,
    })) as T;
  }
}
