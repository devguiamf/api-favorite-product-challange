import { mongoContainer } from "./global-setup.e2e";

async function stopMongoDB() {
  console.log('⌛ Stopping MongoDBContainer...');
  await mongoContainer.stop();
  console.log('💤 MongoDBContainer stopped');
}

async function teardown() {
    console.log('teardown...');
    await stopMongoDB();
}

export default teardown;