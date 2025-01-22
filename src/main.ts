import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DefaultExceptionFilter } from './infra/http/filters/default-exception-filter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new DefaultExceptionFilter());

  app.enableCors({
    origin: '*',
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
