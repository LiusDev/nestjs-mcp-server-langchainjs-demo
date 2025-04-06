# NestJS MCP Server - Model Context Protocol Example

> By: [@LiusDev](https://github.com/liusdev)

This repository demonstrates a NestJS implementation of the Model Context Protocol (MCP) with a microservice architecture. It consists of two main services:

1. **mcp-server**: Provides functions to get current time context for LLMs
2. **mcp-backend**: A client that uses LangChain.js and integrates with the MCP client SDK to connect to the MCP server

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Rename the `.env.example` to `.env` and add your OpenAI API key:

```bash
cp .env.example .env
```

Then edit the `.env` file to include your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_URL=https://api.openai.com/v1
PORT=3001
```

## Running the Services

You need to run both services for the complete functionality:

### Start the MCP Server

```bash
npm run start:dev mcp-server
```

This will start the MCP server on port 3000 (default).

### Start the MCP Backend

```bash
npm run start:dev mcp-backend
```

This will start the MCP backend on port 3001 (default).

## Usage Example

Once both services are running, you can test the functionality by sending a POST request to the MCP backend:

### Sample Request

Send a POST request to `http://localhost:3001` with the following JSON body:

```json
{
  "message": "What time is it in Viet Nam?"
}
```

### Using cURL

```bash
curl -X POST http://localhost:3001 -H "Content-Type: application/json" -d "{\"message\": \"What time is it in Viet Nam?\"}"
```

### Using Postman

1. Create a new POST request to `http://localhost:3001`
2. Set the Content-Type header to `application/json`
3. In the request body, select "raw" and "JSON", then enter:
   ```json
   {
     "message": "What time is it in Viet Nam?"
   }
   ```
4. Send the request

The response will contain the current time in Vietnam, retrieved through the MCP server's time context function.

## Connecting to Multiple MCP Servers

The backend can connect to multiple MCP servers simultaneously. To add additional servers, modify the `McpClientModule.register` configuration in `apps/mcp-backend/src/mcp-backend.module.ts`:

```typescript
McpClientModule.register({
  throwOnLoadError: true,
  prefixToolNameWithServerName: false,  // Set to true to prefix tool names with server names
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
    // Add additional servers here
    anotherServer: {
      transport: 'sse',
      url: 'http://localhost:4000/sse',  // Different port for another server
      useNodeEventSource: true,
      reconnect: {
        enabled: true,
        maxAttempts: 5,
        delayMs: 2000,
      },
    },
  },
}),
```

When connecting to multiple servers:

- Consider setting `prefixToolNameWithServerName: true` to avoid tool name conflicts
- Ensure each server has a unique key in the `mcpServers` object
- Make sure each server is running on a different port

The MCP client will automatically fetch tools from all configured servers and make them available to the LLM.

## Architecture

- **mcp-server**: Exposes tools via the Model Context Protocol, including a function to get the current time
- **mcp-backend**: Connects to the MCP server, retrieves available tools, and uses them with LangChain.js to process user queries

## Technologies Used

- NestJS
- LangChain.js
- Model Context Protocol (MCP)
- @langchain/mcp-adapters: MCP client adapters for LangChain.js
- @rekog/mcp-nest: MCP server implementation for NestJS

## Project Structure

```
mcp-server/
├── apps/
│   ├── mcp-server/       # MCP server implementation
│   └── mcp-backend/      # MCP client implementation
├── dist/                 # Compiled output
├── node_modules/
├── .env                  # Environment variables
└── package.json
```

## License

This project is licensed under the UNLICENSED License - see the LICENSE file for details.
