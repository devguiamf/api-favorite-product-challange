import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DefaultExceptionFilter } from './infra/http/filters/default-exception-filter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new DefaultExceptionFilter());

  app.enableCors({
    origin: '*', // Origem específica do Angular
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
    credentials: true, // Se necessário, para cookies e autenticação
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
