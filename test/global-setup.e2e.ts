import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import { Env } from 'src/infra/env/env';

export let mongoContainer: StartedMongoDBContainer;

async function startMongoDB() {
  console.log('⌛ Starting MongoDBContainer...');

  mongoContainer = await new MongoDBContainer().start();

  const uri = `${mongoContainer.getConnectionString()}?directConnection=true`;

  console.log(`🚀 MongoDBContainer started at ${uri}`);

  return { uri };
}

async function setup() {
  const { uri } = await startMongoDB();

  const mockedEnvs: Env = {
    PORT: 8000,
    MONGO_URI: uri,
    JWT_SECRET: 'jwt_secret',
    JWT_EXPIRES_IN: '1d',
  };

  Object.entries(mockedEnvs).forEach(([key, value]) => {
    process.env[key] = value as any;
  });
}

export default setup;