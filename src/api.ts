import fetch from 'node-fetch';

// Provide all API helper methods for Automatisch MCP
export function apiHelpers(main: any) {
  return {
    apiRequest: async function(endpoint: any, options: any = {}) {
      // ... copy apiRequest logic from index.ts ...
    },
    listWorkflows: async function(args: any = {}) {
      // ... copy listWorkflows logic from index.ts ...
    },
    getWorkflow: async function(workflowId: any) {
      // ... copy getWorkflow logic from index.ts ...
    },
    createWorkflow: async function(data: any) {
      // ... copy createWorkflow logic from index.ts ...
    },
    updateWorkflow: async function(workflowId: any, data: any) {
      // ... copy updateWorkflow logic from index.ts ...
    },
    deleteWorkflow: async function(workflowId: any) {
      // ... copy deleteWorkflow logic from index.ts ...
    },
    listConnections: async function(args: any = {}) {
      // ... copy listConnections logic from index.ts ...
    },
    createConnection: async function(data: any) {
      // ... copy createConnection logic from index.ts ...
    },
    listExecutions: async function(args: any = {}) {
      // ... copy listExecutions logic from index.ts ...
    },
    getAvailableApps: async function(args: any = {}) {
      // ... copy getAvailableApps logic from index.ts ...
    },
    testWorkflow: async function(workflowId: any, testData: any = {}) {
      // ... copy testWorkflow logic from index.ts ...
    },
    getWorkflowsOverview: async function() {
      // ... copy getWorkflowsOverview logic from index.ts ...
    },
    getConnectionsOverview: async function() {
      // ... copy getConnectionsOverview logic from index.ts ...
    },
    getRecentExecutions: async function() {
      // ... copy getRecentExecutions logic from index.ts ...
    }
  };
} 