import { neon } from '@neondatabase/serverless';

export const getSql = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    if (process.env.NODE_ENV === 'production') {
      console.error('DATABASE_URL is not defined in environment');
    }
    return null;
  }
  return neon(url);
};
