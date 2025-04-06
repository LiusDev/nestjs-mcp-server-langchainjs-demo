import { Module, DynamicModule } from '@nestjs/common';
import { McpClientService } from './mcp-client.service';
import { ClientConfig } from '@langchain/mcp-adapters/dist/client';

@Module({})
export class McpClientModule {
  static register(options: ClientConfig): DynamicModule {
    return {
      module: McpClientModule,
      providers: [
        {
          provide: 'MCP_CLIENT_OPTIONS',
          useValue: options,
        },
        McpClientService,
      ],
      exports: [McpClientService],
    };
  }
}
