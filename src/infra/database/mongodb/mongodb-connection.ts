import { Provider } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { EnvService } from 'src/infra/env/env.service';

export const MONGO_DB_CONNECTION = Symbol('MONGO_DB_CONNECTION');

export const MONGO_DB_CONNECTION_PROVIDER: Provider<MongoClient> = {
  provide: MONGO_DB_CONNECTION,
  inject: [EnvService],
  useFactory: async (envService: EnvService) => {
    const MONGO_URI = envService.get('MONGO_URI');

    const client = await new MongoClient(MONGO_URI, {
      maxPoolSize: 100,
    }).connect();

    await createIndexes(client);

    return client;
  },
};

async function createIndexes(client: MongoClient) {
  const db = client.db();
  const usersCollection = db.collection('user');
  await usersCollection.createIndex({ email: 1 }, { unique: true });
  const favoriteListCollection = db.collection('favorite-list');
  await favoriteListCollection.createIndex({ userId: 1 }, { unique: true });
}
