import { Module } from '@nestjs/common';
import { BcryptHasher } from './bcrpyt-hahser';
import { JwtEncrypter } from './jwt-encrypter';
import { EnvModule } from '../env/env.module';
import { Hasher } from 'src/domain/application/cryptography/hasher';
import { Encrypter } from 'src/domain/application/cryptography/encrypter';

@Module({
  imports: [EnvModule],
  providers: [
    { provide: Hasher, useClass: BcryptHasher },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
  ],
  exports: [Encrypter, Hasher],
})
export class CryptographyModule {}
