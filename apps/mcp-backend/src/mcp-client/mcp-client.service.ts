// mcp-client.service.ts
import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import type { ClientConfig } from '@langchain/mcp-adapters/dist/client';

@Injectable()
export class McpClientService implements OnModuleInit, OnModuleDestroy {
  private client: MultiServerMCPClient;

  constructor(@Inject('MCP_CLIENT_OPTIONS') private options: ClientConfig) {}

  async onModuleInit() {
    // Initialize the client when the module is initialized
    await this.connect();
  }

  async onModuleDestroy() {
    // Clean up connections when the module is destroyed
    await this.disconnect();
  }

  private async connect() {
    // Create a new client instance
    this.client = new MultiServerMCPClient(this.options);

    await this.client.initializeConnections();

    return this.client;
  }

  async getClient() {
    if (!this.client) {
      await this.connect();
    }

    return this.client;
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
    }
  }

  async getTools() {
    return await this.client.getTools();
  }
}
