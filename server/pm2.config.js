module.exports = {
  apps: [
    {
      name: 'dev-irzaw',
      script: 'dev_irzaw.js', // Change to your entry point file
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

