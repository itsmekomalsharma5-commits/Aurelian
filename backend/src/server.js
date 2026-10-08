import app from './app.js';
import { config } from './config/index.js';

const server = app.listen(config.port, '0.0.0.0', () => {
  console.log('═══════════════════════════════════════════════════════════');
  console.log(` ✨ AURELIAN MAISON HIGH JEWELRY BACKEND SERVICE ✨`);
  console.log(` Server active on:  http://0.0.0.0:${config.port}`);
  console.log(` Health check:     http://localhost:${config.port}/api/health`);
  console.log(` API Directory:    http://localhost:${config.port}/api`);
  console.log(` Environment:      ${config.env}`);
  console.log('═══════════════════════════════════════════════════════════');
});

// Graceful shutdown handling
const shutdown = (signal) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('Aurelian Backend HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
