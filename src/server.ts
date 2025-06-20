import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { setupHandlers } from './handlers.js';
import { apiHelpers } from './api.js';

// AutomatischMCPServer provides the main server logic for Automatisch MCP
class AutomatischMCPServer {
  private server: Server;
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.server = new Server(
      {
        name: "automatisch-mcp-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    // Environment variables for Automatisch API connection
    this.baseUrl = process.env.AUTOMATISCH_BASE_URL || 'http://localhost:3001';
    this.apiKey = process.env.AUTOMATISCH_API_KEY || '';

    // Setup all request handlers
    setupHandlers(this.server, this);
  }

  // Expose API helpers for handlers
  public api = apiHelpers(this);

  // Start the server using stdio transport
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Automatisch MCP server running on stdio");
  }
}

export default AutomatischMCPServer; 