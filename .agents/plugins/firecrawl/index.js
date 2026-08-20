const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Load .env from home directory or project root
const homeEnv = path.join(os.homedir(), '.env');
const projectEnv = path.join(process.cwd(), '.env');

const loadEnv = (envPath) => {
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        value = value.trim();
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value;
      }
    });
  }
};

loadEnv(homeEnv);
loadEnv(projectEnv);

const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const child = spawn(npxCmd, ['-y', '@modelcontextprotocol/mcp-server-firecrawl'], {
  stdio: 'inherit',
  env: process.env
});

child.on('close', (code) => {
  process.exit(code);
});
