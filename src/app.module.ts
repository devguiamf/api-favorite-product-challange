import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './infra/env/env.module';
import { HttpModule } from './infra/http/http.module';
import { envSchema } from './infra/env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
    HttpModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
