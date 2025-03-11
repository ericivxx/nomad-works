import { JobProviderConfig } from './types';

export interface JobProvidersConfig {
  remoteok: JobProviderConfig;
  adzuna: JobProviderConfig;
  rapidapi: JobProviderConfig;
}

const config: JobProvidersConfig = {
  remoteok: {
    enabled: true,
    apiUrl: 'https://remoteok.com/api'
  },
  adzuna: {
    enabled: true,
    apiKey: process.env.ADZUNA_API_KEY,
    apiUrl: 'https://api.adzuna.com/v1/api/jobs',
    options: {
      appId: process.env.ADZUNA_APP_ID,
      country: 'gb' // Default to UK, but we can make this configurable
    }
  },
  rapidapi: {
    enabled: true,
    apiKey: process.env.RAPIDAPI_KEY,
    apiUrl: 'https://job-posting-feed-api.p.rapidapi.com/active-ats-meili',
    options: {
      host: 'job-posting-feed-api.p.rapidapi.com'
    }
  }
};

export default config;