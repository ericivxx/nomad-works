import { JobProviderConfig } from './types';
import fs from 'fs';
import path from 'path';

export interface JobProvidersConfig {
  remoteok: JobProviderConfig;
  adzuna: JobProviderConfig;
  rapidapi: JobProviderConfig;
}

// Default configuration
const defaultConfig: JobProvidersConfig = {
  remoteok: {
    enabled: false,
    apiUrl: 'https://remoteok.com/api'
  },
  adzuna: {
    enabled: false,
    apiKey: process.env.ADZUNA_API_KEY,
    apiUrl: 'https://api.adzuna.com/v1/api/jobs',
    options: {
      appId: process.env.ADZUNA_APP_ID,
      country: 'gb' // Default to UK, but we can make this configurable
    }
  },
  rapidapi: {
    enabled: false,
    apiKey: process.env.RAPIDAPI_KEY,
    apiUrl: 'https://jsearch.p.rapidapi.com/search',
    options: {
      host: 'jsearch.p.rapidapi.com'
    }
  }
};

// Try to load configuration from file
const configFilePath = path.join(process.cwd(), 'api_config.json');
let config: JobProvidersConfig;

try {
  if (fs.existsSync(configFilePath)) {
    const fileData = fs.readFileSync(configFilePath, 'utf8');
    const fileConfig = JSON.parse(fileData);
    // Merge with default config to ensure all required properties exist
    config = {
      remoteok: { ...defaultConfig.remoteok, ...fileConfig.remoteok },
      adzuna: { ...defaultConfig.adzuna, ...fileConfig.adzuna },
      rapidapi: { ...defaultConfig.rapidapi, ...fileConfig.rapidapi }
    };
    console.log('Loaded API provider configuration from file');
  } else {
    console.log('No API config file found, using default configuration');
    config = defaultConfig;
    
    // Create the default config file
    fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
    console.log('Created default API config file');
  }
} catch (error) {
  console.error('Error loading API config from file:', error);
  config = defaultConfig;
}

export default config;