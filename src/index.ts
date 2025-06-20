#!/usr/bin/env node

import AutomatischMCPServer from './server.js';

const server = new AutomatischMCPServer();
server.run().catch(console.error);