#!/bin/bash
# Deploy script that builds and restarts the application in production mode

# Stop any running services
echo "Stopping any running services..."
pkill -f "node dist/index.js" || true

# Set environment to production
export NODE_ENV=production

# Build the application
echo "Building application for production..."
npm run build

# Start the server in production mode
echo "Starting server in production mode..."
nohup node dist/index.js > nomadworks.log 2>&1 &

echo "Deployment complete! Application is running in production mode."
echo "Check nomadworks.log for output."