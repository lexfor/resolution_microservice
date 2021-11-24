import { getParameter } from './aws/getParameter';

export default async () => ({
  SECRET_KEY: await getParameter('SECRET_KEY'),
  DATABASE_URL: await getParameter('DATABASE_URL'),
  TTL_DELAY: await getParameter('TTL_DELAY'),
  USERS_MICROSERVICE_GRPC: await getParameter('USERS_MICROSERVICE_GRPC'),
  GRPC_URL: await getParameter('GRPC_URL'),
});
