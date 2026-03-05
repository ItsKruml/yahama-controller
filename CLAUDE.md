# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Yamaha RX-V577 Controller - A professional web-based control interface for Yamaha AV receivers with advanced audio features, multi-zone support, and PWA capabilities. The application runs as a Node.js Express server with a single-page vanilla JavaScript frontend.

## Architecture

### Core Components

**Server (server.js)**
- Express.js server on port 5001
- CORS proxy to bypass browser restrictions when communicating with receiver
- Persistent IP configuration storage in `receiver-config.json`
- Static file serving for the frontend
- Health check endpoint at `/api/health`

**Frontend (index.html)**
- Single-file application with embedded CSS and JavaScript
- `YamahaAdvancedReceiver` class handles all receiver communication
- Three main tabs: Basic controls, Extended features, System info
- Real-time status polling every 5 seconds when connected
- XML-based communication with receiver through server proxy

### Communication Flow
1. Frontend sends XML commands to `/api/receiver/*` endpoint
2. Server proxies requests to actual receiver IP
3. Receiver responds with XML
4. Frontend parses XML response and updates UI

## Common Commands

```bash
# Development
npm start                     # Start server (port 5001)
npm run dev                   # Start with nodemon for auto-reload

# PM2 Production (on Raspberry Pi)
pm2 status                    # Check service status
pm2 logs yamaha-controller    # View logs
pm2 restart yamaha-controller # Restart service
pm2 save                      # Save current PM2 config

# Testing
curl http://localhost:5001/api/health  # Health check
curl -X POST http://192.168.x.x/YamahaRemoteControl/ctrl -H "Content-Type: text/xml" -d '<YAMAHA_AV cmd="GET"><Main_Zone><Basic_Status>GetParam</Basic_Status></Main_Zone></YAMAHA_AV>' # Direct receiver test
```

## Key Implementation Details

### Yamaha XML API
- All commands use POST requests to `/YamahaRemoteControl/ctrl`
- Commands are XML formatted: `<YAMAHA_AV cmd="PUT">...</YAMAHA_AV>`
- Zone-based control (Main_Zone, Zone_2)
- Volume values are in 1/10 dB units (e.g., -500 = -50.0 dB)

### Frontend State Management
- Receiver IP stored in both localStorage and server-side JSON file
- Connection state managed in `YamahaAdvancedReceiver.connected`
- UI updates happen through `updateUI()` method after each command
- Status polling via `getStatus()` every 5 seconds when connected

### Project Structure
```
yamaha-controller/
├── .github/              # GitHub templates and workflows
│   └── ISSUE_TEMPLATE/   # Bug report and feature request templates
├── docs/                 # Documentation
│   ├── API.md           # XML protocol documentation
│   └── DEPLOYMENT.md    # Deployment guide
├── public/               # Static assets
│   └── assets/          # Images and mockups
├── scripts/             # Utility scripts (future)
├── tests/               # Test files (future)
├── examples/            # Example configurations (future)
├── index.html           # Main frontend application
├── server.js            # Express server with CORS proxy
├── package.json         # Dependencies
├── receiver-config.json # Persisted receiver IP (gitignored)
├── CLAUDE.md            # This file - AI assistance guide
├── README.md            # Main documentation (English)
├── CONTRIBUTING.md      # Contribution guidelines
├── CHANGELOG.md         # Version history
├── LICENSE              # MIT License
├── Dockerfile           # Docker container definition
└── docker-compose.yml   # Docker compose configuration
```

### Critical Files
- `index.html` - Contains entire frontend application
- `server.js` - Express server with CORS proxy
- `receiver-config.json` - Persisted receiver IP (gitignored)
- `package.json` - Dependencies (express, cors, http-proxy-middleware)
- `docs/API.md` - Complete XML protocol documentation
- `docs/DEPLOYMENT.md` - Deployment instructions

## Deployment Notes

The app runs on a Raspberry Pi using PM2 process manager:
- Service name: `yamaha-controller`
- Auto-starts via SystemD integration
- Accessible on LAN at `http://[RASPI-IP]:5001`

## Common Issues and Solutions

### Connection Problems
- Check if receiver IP is reachable: `ping [RECEIVER-IP]`
- Verify server proxy: `curl -X POST http://localhost:5001/api/receiver/YamahaRemoteControl/ctrl`
- Add detailed logging: Console will show "Setting receiver IP" and "Getting receiver status" messages

### Null Pointer Errors
- Always add null checks when accessing DOM elements: `const element = document.getElementById('id'); if (element) { ... }`
- Common issue with tab elements not being found during initialization

### Auto-Connect Behavior
- Auto-connect is enabled and triggers automatically when saved IP is found
- Connection attempts happen 1 second after page load for UI stability
- Falls back to manual connection if no saved IP is available

## Recent Changes (March 2026)

### Documentation & Structure Update
- **Complete English documentation** - README fully translated with professional formatting
- **Repository restructure** - Organized directories (docs/, tests/, examples/, scripts/)
- **Comprehensive badges** - Added project status, technology, and activity badges
- **Docker support** - Added Dockerfile and docker-compose.yml for containerized deployment
- **API documentation** - Complete XML protocol documentation in docs/API.md
- **Deployment guide** - Multiple deployment options documented (PM2, Docker, systemd)
- **Contributing guidelines** - Added CONTRIBUTING.md with detailed instructions
- **Issue templates** - Bug report and feature request templates for GitHub

### Previous Updates (August 2025)
- **Unlock mechanism completely removed** - App works without authentication
- **UI optimization** - Audio Enhancement moved to second section in basic controls
- **Auto-connect enabled** - Automatic connection on page load with saved IP
- **Improved error handling** - Better logging and null checks
- **Enhanced stability** - Robust connection logic with error handling
- **No authentication barriers** - All control functions directly accessible

## Error Handling

- Network errors show user-friendly messages via toast notifications
- Receiver connection failures provide specific error details in console
- XML parsing errors are caught and logged to console
- Server proxy errors return appropriate HTTP status codes
- Null element access is protected with defensive checks