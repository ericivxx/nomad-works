#!/bin/bash
# Production deployment script for NomadWorks

echo "Installing production dependencies..."
npm ci --only=production

echo "Building application for production..."
npm run build

echo "Setting environment to production..."
export NODE_ENV=production

# Clean up development files to reduce deployment size
rm -rf node_modules/.cache

# Check for required environment variables
if [ -z "$STRIPE_SECRET_KEY" ]; then
  echo "Warning: STRIPE_SECRET_KEY environment variable is not set"
  echo "Checkout functionality will not work in production"
  echo "Please set this variable in your deployment environment"
fi

if [ -z "$STRIPE_WEBHOOK_SECRET" ]; then
  echo "Warning: STRIPE_WEBHOOK_SECRET environment variable is not set"
  echo "Stripe webhook verification will be disabled"
  echo "Please set this variable in your deployment environment for secure webhook handling"
fi

# Create logs directory if it doesn't exist
mkdir -p logs

echo "Starting production server..."
npm start