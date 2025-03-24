#!/bin/bash
# Production deployment script for Replit Deployments

echo "Starting NomadWorks production deployment..."

# Set environment to production
export NODE_ENV=production

echo "Building for production..."
npm run build

echo "Starting production server..."
node dist/index.js