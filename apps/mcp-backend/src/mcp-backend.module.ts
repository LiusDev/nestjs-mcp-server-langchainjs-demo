import { Module } from '@nestjs/common';
import { McpClientModule } from './mcp-client/mcp-client.module';
import { AiModule } from './ai/ai.module';
import { McpBackendController } from './mcp-backend.controller';
import { McpBackendService } from './mcp-backend.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        OPENAI_API_KEY: Joi.string().required(),
        OPENAI_API_URL: Joi.string().default('https://api.openai.com/v1'),
        PORT: Joi.number().default(3001),
      }),
    }),
    AiModule,
    McpClientModule.register({
      throwOnLoadError: true,
      prefixToolNameWithServerName: false,
      additionalToolNamePrefix: '',
      mcpServers: {
        myServer: {
          transport: 'sse',
          url: 'http://localhost:3000/sse',
          useNodeEventSource: true,
          reconnect: {
            enabled: true,
            maxAttempts: 5,
            delayMs: 2000,
          },
        },
      },
    }),
  ],
  controllers: [McpBackendController],
  providers: [McpBackendService],
})
export class McpBackendModule {}
