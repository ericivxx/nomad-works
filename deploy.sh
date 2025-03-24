#!/bin/bash
# Deploy script that builds the application for production
# This script only builds, not starts, for more reliable deployment

echo "Building NomadWorks for production..."

# Set environment to production
export NODE_ENV=production

# Clean previous build
echo "Cleaning previous build..."
rm -rf dist

# Build the application
echo "Building application..."
npm run build

echo "Build complete! To start in production mode, run:"
echo "NODE_ENV=production node dist/index.js"
echo ""
echo "For Replit deployment:"
echo "1. Open the Deployment tab"
echo "2. Change the Run Command to: NODE_ENV=production node dist/index.js"