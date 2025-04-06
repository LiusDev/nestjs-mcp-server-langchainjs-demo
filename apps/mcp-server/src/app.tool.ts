import { Injectable } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { AppService } from './app.service';

@Injectable()
export class AppTool {
  constructor(private readonly appService: AppService) {}

  @Tool({
    name: 'hello',
    description:
      'Returns a greeting and simulates a long operation with progress updates',
    parameters: z.object({
      name: z.string().default('World').describe('Name of the person to greet'),
    }),
  })
  async sayHello({ name }, context: Context) {
    const greeting = `Hello, ${name} from MCP Server!`;

    return {
      content: [{ type: 'text', text: greeting }],
    };
  }

  @Tool({
    name: 'time',
    description: 'Returns the current time of Viet Nam',
    parameters: z.object({}),
  })
  async getTime() {
    const data = await this.appService.getTime();
    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
    };
  }
}
