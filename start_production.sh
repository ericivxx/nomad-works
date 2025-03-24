#!/bin/bash
# Script to start the NomadWorks application in production mode

echo "Starting NomadWorks in production mode..."

# Set environment to production
export NODE_ENV=production

# Check if the build exists
if [ ! -f ./dist/index.js ]; then
  echo "ERROR: Build not found!"
  echo "Please run './deploy.sh' first to build the application."
  exit 1
fi

# Start the server
echo "Starting production server..."
node dist/index.js