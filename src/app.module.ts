import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './infra/env/env.module';
import { HttpModule } from './infra/http/http.module';
import { envSchema } from './infra/env/env';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
    HttpModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
