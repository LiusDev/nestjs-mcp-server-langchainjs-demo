import { Injectable } from '@nestjs/common';
import { McpClientService } from './mcp-client/mcp-client.service';
import { AiService } from './ai/ai.service';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';

@Injectable()
export class McpBackendService {
  constructor(
    private readonly mcpClientService: McpClientService,
    private readonly aiService: AiService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendMessage(body: { message: string }) {
    const { message } = body;
    const llm = this.aiService.getLLM();
    const tools = await this.mcpClientService.getTools();
    const agent = this.aiService.getAgent({
      llm,
      tools,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a helpful assistant'],
      ['human', '{input}'],
    ]);

    const chain = RunnableSequence.from([
      prompt,
      agent,
      (agentResponse: { messages: any[] }) => {
        const messages = agentResponse.messages || [];

        const lastMessage = messages[messages.length - 1];

        return lastMessage?.content || '';
      },
      new StringOutputParser(),
    ]);

    const res = await chain.invoke({
      input: message,
    });

    return res;
  }
}
