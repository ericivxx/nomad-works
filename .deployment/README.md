# NomadWorks Production Deployment Guide

## Prerequisites

Before deploying to production, ensure you have:

1. Set the `STRIPE_SECRET_KEY` environment variable in your Replit Secrets
2. Optionally set the `STRIPE_WEBHOOK_SECRET` for secure webhook handling

## Deployment Instructions

1. Set your environment variables in the Replit Secrets panel
2. Update the deployment command in your Replit deployment settings:
   - Change `npm run dev` to `npm run start:prod`
3. Click Deploy in Replit

## Environment Variables

| Variable Name | Required | Description |
|---------------|----------|-------------|
| STRIPE_SECRET_KEY | Yes | Your Stripe Secret Key for payment processing |
| STRIPE_WEBHOOK_SECRET | No | Secret for Stripe webhook signature verification |
| NODE_ENV | Yes* | Set to "production" automatically by deployment script |

## Troubleshooting

If deployment fails, check:
- Secrets are correctly configured
- You're using the `npm run start:prod` command and not `npm run dev`
- Build logs for any TypeScript or bundling errors

## Contact

For any deployment issues, please contact support@nomadworks.com