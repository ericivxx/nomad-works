import express, { Request, Response } from 'express';
import config, { JobProvidersConfig } from './jobProviders/config';
import { remoteOkProvider } from './jobProviders/remoteOkProvider';
import { adzunaProvider } from './jobProviders/adzunaProvider';
import { rapidApiProvider } from './jobProviders/rapidApiProvider';
import { jobProviderManager } from './jobProviders';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req: Request, res: Response, next: express.NextFunction) => {
  const user = req.session?.user;
  
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  next();
};

// Apply admin middleware to all routes
router.use(isAdmin);

// Get API configurations
router.get('/api-config', (req: Request, res: Response) => {
  try {
    // Create a response with provider info
    const providers = [
      {
        id: 'remoteok',
        name: 'RemoteOK API',
        enabled: config.remoteok.enabled,
        description: 'Fetches remote job listings from RemoteOK',
        hasApiKey: true, // RemoteOK doesn't require an API key
        status: 'unknown' as const
      },
      {
        id: 'rapidapi',
        name: 'RapidAPI JSearch',
        enabled: config.rapidapi.enabled,
        description: 'Provides comprehensive job search via RapidAPI',
        hasApiKey: !!config.rapidapi.apiKey,
        status: 'unknown' as const
      },
      {
        id: 'adzuna',
        name: 'Adzuna Jobs API',
        enabled: config.adzuna.enabled,
        description: 'Delivers job listings from around the world via Adzuna',
        hasApiKey: !!(config.adzuna.apiKey && config.adzuna.options?.appId),
        status: 'unknown' as const
      },
      {
        id: 'brandfetch',
        name: 'Brandfetch API',
        enabled: true, // This is always enabled as it's used for company logos
        description: 'Retrieves company logos and brand information',
        hasApiKey: !!process.env.BRANDFETCH_API_KEY,
        status: 'unknown' as const
      }
    ];
    
    res.json({ providers });
  } catch (error) {
    console.error('Error getting API configurations:', error);
    res.status(500).json({ error: 'Failed to get API configurations' });
  }
});

// Update API configurations
router.post('/api-config', (req: Request, res: Response) => {
  try {
    const { providers } = req.body;
    
    if (!providers || !Array.isArray(providers)) {
      return res.status(400).json({ error: 'Invalid request format' });
    }
    
    // Update the configuration
    const updatedConfig: JobProvidersConfig = { ...config };
    
    providers.forEach((provider: { id: string; enabled: boolean }) => {
      const { id, enabled } = provider;
      
      if (id === 'remoteok' && updatedConfig.remoteok) {
        updatedConfig.remoteok.enabled = enabled;
      } else if (id === 'rapidapi' && updatedConfig.rapidapi) {
        updatedConfig.rapidapi.enabled = enabled;
      } else if (id === 'adzuna' && updatedConfig.adzuna) {
        updatedConfig.adzuna.enabled = enabled;
      }
      // Brandfetch doesn't have an enabled flag as it's always required
    });
    
    // Save the updated configuration to a JSON file
    const configFilePath = path.join(process.cwd(), 'api_config.json');
    fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2));
    
    // Update the in-memory config
    Object.assign(config.remoteok, updatedConfig.remoteok);
    Object.assign(config.rapidapi, updatedConfig.rapidapi);
    Object.assign(config.adzuna, updatedConfig.adzuna);
    
    // Reinitialize the job provider manager with updated configuration
    // This allows providers to be added/removed based on config changes
    jobProviderManager.reinitializeProviders();
    
    console.log('Job providers reinitialized with updated configuration');
    
    res.json({ 
      success: true, 
      message: 'API configurations updated successfully',
      config: updatedConfig
    });
  } catch (error) {
    console.error('Error updating API configurations:', error);
    res.status(500).json({ error: 'Failed to update API configurations' });
  }
});

// Check API status
router.get('/api-status', async (req: Request, res: Response) => {
  try {
    // Check each provider's availability
    const remoteOkStatus = await remoteOkProvider.isAvailable();
    const rapidApiStatus = await rapidApiProvider.isAvailable();
    const adzunaStatus = await adzunaProvider.isAvailable();
    
    // Check Brandfetch API by making a simple request
    let brandfetchStatus = false;
    if (process.env.BRANDFETCH_API_KEY) {
      try {
        const response = await fetch('https://api.brandfetch.io/v2/search/google.com', {
          headers: {
            'Authorization': `Bearer ${process.env.BRANDFETCH_API_KEY}`
          }
        });
        brandfetchStatus = response.ok;
      } catch (error) {
        console.error('Error checking Brandfetch API:', error);
        brandfetchStatus = false;
      }
    }
    
    res.json({
      providers: [
        {
          id: 'remoteok',
          status: remoteOkStatus ? 'available' : 'unavailable'
        },
        {
          id: 'rapidapi',
          status: rapidApiStatus ? 'available' : 'unavailable'
        },
        {
          id: 'adzuna',
          status: adzunaStatus ? 'available' : 'unavailable'
        },
        {
          id: 'brandfetch',
          status: brandfetchStatus ? 'available' : 'unavailable'
        }
      ]
    });
  } catch (error) {
    console.error('Error checking API status:', error);
    res.status(500).json({ error: 'Failed to check API status' });
  }
});

export default router;