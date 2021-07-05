module.exports = {
  apps: [
    {
      name: 'travelmood-server',
      script: './dist/server.js',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      // development mode
      // pm2 start ecosystem.config.js
      env: {
        HOST: '0.0.0.0',
        PORT: 5000,
        NODE_ENV: 'development',
      },
      // production mode
      // pm2 start ecosystem.config.js --env production
      env_production: {
        HOST: '0.0.0.0',
        PORT: 5000,
        NODE_ENV: 'development',
      },
      output: './logs/console.log',
      error: './logs/consoleError.log',
    },
  ],

  deploy: {
    production: {
      // sample
      user: 'node',
      host: '123.12.123.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
