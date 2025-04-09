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

  @Tool({
    name: 'get-todos',
    description: '',
    parameters: z.object({}),
  })
  async getTodos() {
    const data = await this.appService.getTodos();
    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
    };
  }

  @Tool({
    name: 'create-todo',
    description: '',
    parameters: z.object({
      title: z.string().default('New todo').describe('Todo title'),
      content: z.string().default('New content').describe('Todo content'),
    }),
  })
  async createTodo({ title, content }: { title: string; content: string }) {
    const data = await this.appService.createTodo(title, content);
    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
    };
  }

  @Tool({
    name: 'update-todo',
    description: 'Tool to update todo based on ID',
    parameters: z.object({
      id: z.number().describe('ID of update task'),
      title: z.string().default('New todo').describe('Todo title'),
      content: z.string().default('New content').describe('Todo content'),
      isDone: z.boolean().describe('Is task done'),
    }),
  })
  async updateTodo({
    id,
    title,
    content,
    isDone,
  }: {
    id: number;
    title: string;
    content: string;
    isDone: boolean;
  }) {
    const data = await this.appService.updateTodo(id, title, content, isDone);
    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
    };
  }

  @Tool({
    name: 'delete-todo',
    description: 'Tool to delete todo based on ID',
    parameters: z.object({
      id: z.number().describe('ID of delete task'),
    }),
  })
  async deleteTodo({ id }: { id: number }) {
    const data = await this.appService.deleteTodo(id);
    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
    };
  }
}
