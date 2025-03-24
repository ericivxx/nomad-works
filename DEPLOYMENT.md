# NomadWorks Deployment Instructions

## Key Issues Identified

1. **Incorrect deployment command**: The Replit deployment is currently set to use `npm run dev` instead of a production configuration.
2. **Environment variable handling**: The STRIPE_SECRET_KEY needs to be properly set in the deployment environment.

## Steps to Deploy Successfully

### 1. Update Deployment Command

When deploying on Replit:

1. Click on the "Deployment" tab in your Replit project
2. In "Advanced Settings", change the run command from:
   ```
   npm run dev
   ```
   to:
   ```
   ./replit-deploy.sh
   ```

### 2. Set Up Environment Secrets

Make sure all required secrets are available in the deployment environment:

1. In your Replit project, go to "Secrets" in the Tools sidebar
2. Verify the `STRIPE_SECRET_KEY` is properly set
3. Optionally, add `STRIPE_WEBHOOK_SECRET` if you're using Stripe webhooks in production

### 3. Deploy the Application

1. Click "Deploy" in the Deployments tab
2. Monitor the deployment logs for any issues
3. Once deployed, test the application to ensure all functionality works as expected

## Verification Checklist

After deployment, verify:

- [ ] The application loads properly
- [ ] User authentication works
- [ ] The Stripe checkout process works for the digital nomad guide
- [ ] Blog posts and job listings are displayed correctly

## Troubleshooting

If you encounter issues:

- Check deployment logs for specific error messages
- Verify all environment variables are correctly set
- Ensure the deployment is using the production build script
- If needed, set `NODE_ENV=production` manually in the Secrets panel

For further assistance, refer to the detailed deployment guide in `.deployment/README.md`

## Production vs Development

The key differences between production and development environments:

- Production uses minified and optimized assets
- Production has stricter webhook verification for Stripe
- Production typically has better performance and caching
- Development mode exposes more debugging information