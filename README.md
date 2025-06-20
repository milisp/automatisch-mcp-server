# Automatisch MCP Server

A Model Context Protocol (MCP) server that provides AI assistants with access to [Automatisch](https://github.com/automatisch/automatisch) workflow automation capabilities.

## Overview

This MCP server enables AI assistants to interact with Automatisch, an open-source Zapier alternative for workflow automation. It provides tools to manage workflows, connections, executions, and app integrations.

## Features

### Tools Available
- **Workflow Management**: Create, read, update, delete, and test workflows
- **Connection Management**: Manage app connections and credentials
- **Execution Monitoring**: View workflow execution history and status
- **App Discovery**: Browse available apps and their capabilities
- **Testing**: Test workflows with sample data

### Resources Provided
- Workflows overview with status summary
- App connections listing
- Available apps catalog
- Recent executions log

## Prerequisites

- Node.js 18+ 
- Running Automatisch instance
- Automatisch API access (API key recommended)

## Installation

1. Clone or download the MCP server code
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Configuration

Set environment variables:

```bash
# Automatisch instance URL (default: http://localhost:3001)
export AUTOMATISCH_BASE_URL="http://your-automatisch-instance:3001"

# API key for authentication (optional but recommended)
export AUTOMATISCH_API_KEY="your-api-key"
```

## Usage

### Claude Desktop Integration

Add to your Claude Desktop configuration file:

```json
{
  "mcpServers": {
    "automatisch": {
      "command": "node",
      "args": ["path/to/automatisch-mcp-server/dist/index.js"],
      "env": {
        "AUTOMATISCH_BASE_URL": "http://localhost:3001",
        "AUTOMATISCH_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Standalone Usage

```bash
npm start
```

## Available Tools

### Workflow Management
- `list_workflows` - List all workflows with optional filtering
- `get_workflow` - Get detailed workflow information
- `create_workflow` - Create new workflow
- `update_workflow` - Update existing workflow
- `delete_workflow` - Delete workflow
- `test_workflow` - Test workflow with sample data

### Connection Management
- `list_connections` - List app connections
- `create_connection` - Create new app connection

### Monitoring & Discovery
- `list_executions` - View workflow execution history
- `get_available_apps` - Browse available apps and integrations

## Example Usage with AI Assistant

```
# List all active workflows
"Show me all active workflows"

# Create a new workflow
"Create a workflow named 'Email Notifications' that sends emails when new GitHub issues are created"

# Check recent executions
"Show me the recent workflow executions and their status"

# Get workflow details
"Tell me about the workflow with ID 'abc123'"

# List available apps
"What apps are available for integration?"
```

## API Endpoints

The server interfaces with these Automatisch API endpoints:

- `GET /api/flows` - List workflows
- `POST /api/flows` - Create workflow
- `PATCH /api/flows/:id` - Update workflow
- `DELETE /api/flows/:id` - Delete workflow
- `GET /api/connections` - List connections
- `POST /api/connections` - Create connection
- `GET /api/executions` - List executions
- `GET /api/apps` - List available apps

## Development

### Running in Development Mode

```bash
npm run dev
```

### Building

```bash
npm run build
```

### Cleaning Build Files

```bash
npm run clean
```

## Error Handling

The server includes comprehensive error handling:

- Network connectivity issues with Automatisch
- Invalid API responses
- Missing required parameters
- Authentication failures

Errors are logged and returned as structured responses to the AI assistant.

## Security Considerations

- Use API keys for authentication when available
- Ensure Automatisch instance is properly secured
- Limit network access to trusted sources
- Regularly update dependencies

## Troubleshooting

### Common Issues

1. **Connection Failed**: Verify `AUTOMATISCH_BASE_URL` is correct and accessible
2. **Authentication Error**: Check `AUTOMATISCH_API_KEY` is valid
3. **Tool Not Found**: Ensure MCP server is properly registered with Claude Desktop
4. **API Errors**: Check Automatisch logs for detailed error information

### Debug Mode

Enable debug logging by setting:
```bash
export NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Related Projects

- [Automatisch](https://github.com/automatisch/automatisch) - Open source workflow automation
- [Model Context Protocol](https://modelcontextprotocol.io/) - Protocol specification
- [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk) - TypeScript SDK

## Support

For issues related to:
- **Issues specific to MCP Server integration or this repository**: [Open an issue here](https://github.com/milisp/automatisch-mcp-server/issues)
- **Automatisch**: Visit [Automatisch GitHub Issues](https://github.com/automatisch/automatisch/issues)
- **MCP Protocol**: Check [MCP Documentation](https://modelcontextprotocol.io/)