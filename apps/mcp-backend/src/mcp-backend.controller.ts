import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { McpBackendService } from './mcp-backend.service';

@Controller()
export class McpBackendController {
  constructor(private readonly mcpBackendService: McpBackendService) {}

  @Get()
  getHello(): string {
    return this.mcpBackendService.getHello();
  }

  @Post()
  async sayHello(@Body() body: { message: string }) {
    try {
      const res = await this.mcpBackendService.sendMessage(body);
      return {
        message: res,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while processing the request.',
      );
    }
  }
}
