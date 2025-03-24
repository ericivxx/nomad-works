#!/bin/bash
# Production deployment script for NomadWorks

echo "Setting up NomadWorks for production deployment..."

# Set environment variables required for production
echo "Setting environment variables..."
export NODE_ENV=production

# Verify Stripe secret key is available
if [ -z "$STRIPE_SECRET_KEY" ]; then
  echo "ERROR: STRIPE_SECRET_KEY environment variable is not set"
  echo "Deployment cannot proceed without this key"
  exit 1
fi

# Install production dependencies
echo "Installing production dependencies..."
npm ci --production

# Build the application
echo "Building application for production..."
npm run build

# Create logs directory
mkdir -p logs

# Start the production server
echo "Starting production server..."
node dist/index.js