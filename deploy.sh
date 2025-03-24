#!/bin/bash
# Production deployment script for NomadWorks

echo "Building application for production..."
npm run build

echo "Setting environment to production..."
export NODE_ENV=production

# Check if STRIPE_SECRET_KEY is set
if [ -z "$STRIPE_SECRET_KEY" ]; then
  echo "Warning: STRIPE_SECRET_KEY environment variable is not set"
  echo "Checkout functionality will not work in production"
  echo "Please set this variable in your deployment environment"
fi

echo "Starting production server..."
npm start