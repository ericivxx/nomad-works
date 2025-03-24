# Deployment Guide for NomadWorks

This guide explains how to properly deploy the NomadWorks platform on Replit Deployments.

## Pre-deployment Checklist

Before deploying, make sure you have:

1. Set up the required environment secrets:
   - `STRIPE_SECRET_KEY` - Required for payment processing
   - `STRIPE_WEBHOOK_SECRET` - Optional but recommended for production webhook verification

## Deployment Configuration

The application needs to run in production mode during deployment. The current deployment configuration in `.replit` is set to run the development server, which is not ideal for production.

### How to Update Deployment Configuration

When deploying on Replit:

1. In your Replit project, click on the "Deployment" tab
2. Under "Advanced Settings":
   - Change the run command from `npm run dev` to `./replit-deploy.sh`
   - This script handles building the application and starting it in production mode

## Post-deployment Verification

After deployment:

1. Verify that Stripe payment processing works by testing a checkout flow
2. Check that all environment variables are properly set in the deployed environment

## Troubleshooting

If you encounter issues with the deployment:

1. Check that all required environment secrets are properly set in the Replit Secrets tab
2. Verify that the deployment is using the production build command
3. Check the deployment logs for any errors