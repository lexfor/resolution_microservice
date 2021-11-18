import { getParameter } from './getParameter';

export default async () => ({
  SECRET_KEY: await getParameter('SECRET_KEY'),
  DATABASE_URL: await getParameter('DATABASE_URL'),
  TTL_DELAY: await getParameter('TTL_DELAY'),
});
