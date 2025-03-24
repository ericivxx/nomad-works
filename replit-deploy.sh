#!/bin/bash
# Production deployment script for Replit Deployments

echo "Starting NomadWorks production deployment..."

# Set environment to production
export NODE_ENV=production

# Check for required environment variables
if [ -z "$STRIPE_SECRET_KEY" ]; then
  echo "ERROR: Missing STRIPE_SECRET_KEY environment variable"
  echo "Please set this in your Replit Secrets panel before deploying"
  exit 1
fi

echo "Building for production..."
npm run build

echo "Starting production server..."
node dist/index.js