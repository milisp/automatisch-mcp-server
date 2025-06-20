import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema, CallToolRequestSchema, McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

// Setup all request handlers for the Automatisch MCP server
export function setupHandlers(server: Server, main: any) {
  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "list_workflows",
          description: "List all workflows in Automatisch",
          inputSchema: {
            type: "object",
            properties: {
              status: {
                type: "string",
                enum: ["active", "inactive", "all"],
                description: "Filter workflows by status"
              },
              limit: {
                type: "number",
                description: "Limit number of results"
              }
            }
          }
        },
        {
          name: "get_workflow",
          description: "Get detailed information about a specific workflow",
          inputSchema: {
            type: "object",
            properties: {
              workflowId: {
                type: "string",
                description: "Workflow ID to retrieve"
              }
            },
            required: ["workflowId"]
          }
        },
        {
          name: "create_workflow",
          description: "Create a new workflow",
          inputSchema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Workflow name"
              },
              description: {
                type: "string",
                description: "Workflow description"
              },
              active: {
                type: "boolean",
                description: "Whether workflow should be active",
                default: false
              }
            },
            required: ["name"]
          }
        },
        {
          name: "update_workflow",
          description: "Update an existing workflow",
          inputSchema: {
            type: "object",
            properties: {
              workflowId: {
                type: "string",
                description: "Workflow ID to update"
              },
              name: {
                type: "string",
                description: "New workflow name"
              },
              description: {
                type: "string",
                description: "New workflow description"
              },
              active: {
                type: "boolean",
                description: "Workflow active status"
              }
            },
            required: ["workflowId"]
          }
        },
        {
          name: "delete_workflow",
          description: "Delete a workflow",
          inputSchema: {
            type: "object",
            properties: {
              workflowId: {
                type: "string",
                description: "Workflow ID to delete"
              }
            },
            required: ["workflowId"]
          }
        },
        {
          name: "list_connections",
          description: "List all app connections",
          inputSchema: {
            type: "object",
            properties: {
              appKey: {
                type: "string",
                description: "Filter by specific app"
              }
            }
          }
        },
        {
          name: "create_connection",
          description: "Create a new app connection",
          inputSchema: {
            type: "object",
            properties: {
              appKey: {
                type: "string",
                description: "App identifier (e.g., 'slack', 'github')"
              },
              name: {
                type: "string",
                description: "Connection name"
              },
              credentials: {
                type: "object",
                description: "App-specific credentials and configuration"
              }
            },
            required: ["appKey", "name", "credentials"]
          }
        },
        {
          name: "list_executions",
          description: "List workflow executions",
          inputSchema: {
            type: "object",
            properties: {
              workflowId: {
                type: "string",
                description: "Filter by workflow ID"
              },
              status: {
                type: "string",
                enum: ["success", "failure", "running"],
                description: "Filter by execution status"
              },
              limit: {
                type: "number",
                description: "Limit number of results"
              }
            }
          }
        },
        {
          name: "get_available_apps",
          description: "Get list of available apps and their capabilities",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Filter by app category"
              }
            }
          }
        },
        {
          name: "test_workflow",
          description: "Test a workflow with sample data",
          inputSchema: {
            type: "object",
            properties: {
              workflowId: {
                type: "string",
                description: "Workflow ID to test"
              },
              testData: {
                type: "object",
                description: "Sample data for testing"
              }
            },
            required: ["workflowId"]
          }
        }
      ]
    };
  });

  // List available resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "automatisch://workflows",
          mimeType: "application/json",
          name: "Workflows Overview",
          description: "Overview of all workflows and their status"
        },
        {
          uri: "automatisch://connections",
          mimeType: "application/json",
          name: "App Connections",
          description: "List of configured app connections"
        },
        {
          uri: "automatisch://apps",
          mimeType: "application/json",
          name: "Available Apps",
          description: "Catalog of available apps and integrations"
        },
        {
          uri: "automatisch://executions/recent",
          mimeType: "application/json",
          name: "Recent Executions",
          description: "Recent workflow executions and their results"
        }
      ]
    };
  });

  // Handle resource reading
  server.setRequestHandler(ReadResourceRequestSchema, async (request: any) => {
    const { uri } = request.params;
    switch (uri) {
      case "automatisch://workflows":
        return {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(await main.api.getWorkflowsOverview(), null, 2)
            }
          ]
        };
      case "automatisch://connections":
        return {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(await main.api.getConnectionsOverview(), null, 2)
            }
          ]
        };
      case "automatisch://apps":
        return {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(await main.api.getAvailableApps(), null, 2)
            }
          ]
        };
      case "automatisch://executions/recent":
        return {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(await main.api.getRecentExecutions(), null, 2)
            }
          ]
        };
      default:
        throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
    }
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
    const { name, arguments: args } = request.params;
    try {
      switch (name) {
        case "list_workflows":
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(await main.api.listWorkflows(args), null, 2)
              }
            ]
          };
        case "get_workflow":
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(await main.api.getWorkflow(args?.workflowId), null, 2)
              }
            ]
          };
        case "create_workflow":
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(await main.api.createWorkflow(args), null, 2)
              }
            ]
          };
        case "update_workflow":
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(await main.api.updateWorkflow(args?.workflowId, args), null, 2)
              }
            ]
          };
        case "delete_workflow":
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(await main.api.deleteWorkflow(args?.workflowId), null, 2)
              }
            ]
          };
        case "list_connections":
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(await main.api.listConnections(args), null, 2)
              }
            ]
          };
        case "create_connection":
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(await main.api.createConnection(args), null, 2)
              }
            ]
          };
        case "list_executions":
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(await main.api.listExecutions(args), null, 2)
              }
            ]
          };
        case "get_available_apps":
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(await main.api.getAvailableApps(args), null, 2)
              }
            ]
          };
        case "test_workflow":
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(await main.api.testWorkflow(args?.workflowId, args?.testData), null, 2)
              }
            ]
          };
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${errorMessage}`);
    }
  });
} 