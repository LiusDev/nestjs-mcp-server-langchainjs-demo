import { ChatOpenAI, ChatOpenAICallOptions } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { StructuredToolInterface } from '@langchain/core/tools';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  constructor(private readonly configService: ConfigService) {}

  getLLM() {
    return new ChatOpenAI({
      model: 'gpt-4o-mini',
      configuration: {
        baseURL: this.configService.get('OPENAI_API_URL'),
        apiKey: this.configService.get('OPENAI_API_KEY'),
      },
    });
  }

  getAgent({
    llm,
    tools,
  }: {
    llm: ChatOpenAI<ChatOpenAICallOptions>;
    tools: StructuredToolInterface[];
  }) {
    return createReactAgent({
      llm,
      tools,
    });
  }
}
