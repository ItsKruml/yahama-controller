# Deployment Guide

This guide covers various deployment methods for the Yamaha Controller application.

## Table of Contents

- [Local Development](#local-development)
- [Raspberry Pi Deployment](#raspberry-pi-deployment)
- [PM2 Production Setup](#pm2-production-setup)
- [Docker Deployment](#docker-deployment)
- [Nginx Reverse Proxy](#nginx-reverse-proxy)
- [Systemd Service](#systemd-service)
- [Environment Variables](#environment-variables)
- [Security Considerations](#security-considerations)

## Local Development

### Basic Setup

1. Clone the repository:
```bash
git clone https://github.com/pepperonas/yahama-controller.git
cd yahama-controller
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
# or with auto-reload
npm run dev
```

4. Access the application:
```
http://localhost:5001
```

## Raspberry Pi Deployment

### Prerequisites

- Raspberry Pi with Raspberry Pi OS (Bullseye or later)
- Node.js 18.x or higher
- Network connection

### Installation Steps

1. **Update system packages:**
```bash
sudo apt update && sudo apt upgrade -y
```

2. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

3. **Clone and setup application:**
```bash
cd /home/pi/apps
git clone https://github.com/pepperonas/yahama-controller.git
cd yahama-controller
npm install
```

4. **Test the installation:**
```bash
npm start
```

## PM2 Production Setup

PM2 is recommended for production deployments as it provides process management, auto-restart, and logging.

### Install PM2

```bash
sudo npm install -g pm2
```

### Configure Application

1. **Start with PM2:**
```bash
pm2 start server.js --name yamaha-controller
```

2. **Configure auto-start:**
```bash
pm2 startup systemd
# Follow the command output instructions
pm2 save
```

3. **Useful PM2 commands:**
```bash
# View status
pm2 status

# View logs
pm2 logs yamaha-controller

# Restart application
pm2 restart yamaha-controller

# Stop application
pm2 stop yamaha-controller

# Remove from PM2
pm2 delete yamaha-controller

# Monitor resources
pm2 monit
```

### PM2 Ecosystem File

Create `ecosystem.config.js` for advanced configuration:

```javascript
module.exports = {
  apps: [{
    name: 'yamaha-controller',
    script: './server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '100M',
    env: {
      NODE_ENV: 'production',
      PORT: 5001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

Start with ecosystem file:
```bash
pm2 start ecosystem.config.js
```

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port
EXPOSE 5001

# Run application
CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t yamaha-controller .

# Run container
docker run -d \
  --name yamaha-ctrl \
  -p 5001:5001 \
  --restart unless-stopped \
  yamaha-controller

# With volume for config persistence
docker run -d \
  --name yamaha-ctrl \
  -p 5001:5001 \
  -v $(pwd)/receiver-config.json:/usr/src/app/receiver-config.json \
  --restart unless-stopped \
  yamaha-controller
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  yamaha-controller:
    build: .
    container_name: yamaha-ctrl
    ports:
      - "5001:5001"
    volumes:
      - ./receiver-config.json:/usr/src/app/receiver-config.json
      - ./logs:/usr/src/app/logs
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=5001
```

Run with Docker Compose:
```bash
docker-compose up -d
```

## Nginx Reverse Proxy

Configure Nginx to serve the application on a subdomain or path.

### Subdomain Configuration

Create `/etc/nginx/sites-available/yamaha`:

```nginx
server {
    listen 80;
    server_name yamaha.yourdomain.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/yamaha /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yamaha.yourdomain.com
```

## Systemd Service

Alternative to PM2, create a systemd service.

Create `/etc/systemd/system/yamaha-controller.service`:

```ini
[Unit]
Description=Yamaha Controller Web Application
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/apps/yahama-controller
ExecStart=/usr/bin/node /home/pi/apps/yahama-controller/server.js
Restart=always
RestartSec=10
StandardOutput=append:/var/log/yamaha-controller.log
StandardError=append:/var/log/yamaha-controller.error.log

[Install]
WantedBy=multi-user.target
```

Enable and start service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable yamaha-controller
sudo systemctl start yamaha-controller
sudo systemctl status yamaha-controller
```

## Environment Variables

Create `.env` file for configuration:

```bash
# Server Configuration
PORT=5001
NODE_ENV=production

# Network Configuration
HOST=0.0.0.0

# Receiver Defaults
DEFAULT_RECEIVER_IP=192.168.1.100

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

Update `server.js` to use environment variables:

```javascript
require('dotenv').config();

const port = process.env.PORT || 5001;
const host = process.env.HOST || '0.0.0.0';
```

## Security Considerations

### Network Security

1. **Firewall Rules:**
```bash
# Allow only local network access
sudo ufw allow from 192.168.1.0/24 to any port 5001
```

2. **Bind to Local Interface:**
```javascript
// In server.js, bind to local network only
app.listen(port, '192.168.1.x');
```

### Application Security

1. **Rate Limiting:**
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

2. **Input Validation:**
```javascript
app.post('/api/receiver-ip', (req, res) => {
  const ip = req.body.ip;
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  
  if (!ipRegex.test(ip)) {
    return res.status(400).json({ error: 'Invalid IP format' });
  }
  // ... rest of code
});
```

3. **HTTPS Only (Production):**
```javascript
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

## Monitoring

### Health Checks

```bash
# Simple health check
curl http://localhost:5001/api/health

# With monitoring service
*/5 * * * * curl -f http://localhost:5001/api/health || echo "Yamaha Controller is down" | mail -s "Alert" admin@example.com
```

### Log Rotation

Create `/etc/logrotate.d/yamaha-controller`:

```
/var/log/yamaha-controller*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 640 pi pi
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
```bash
# Find process using port 5001
lsof -i :5001
# Kill process
kill -9 <PID>
```

2. **Permission denied:**
```bash
# Fix ownership
chown -R pi:pi /home/pi/apps/yahama-controller
# Fix permissions
chmod -R 755 /home/pi/apps/yahama-controller
```

3. **Node modules issues:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

4. **PM2 not starting on boot:**
```bash
pm2 unstartup
pm2 startup
pm2 save
```