import { NestFactory } from '@nestjs/core';
import { McpBackendModule } from './mcp-backend.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(McpBackendModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') || 3001);
}
bootstrap();
