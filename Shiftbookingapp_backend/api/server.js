import Hapi from 'hapi';

const server = new Hapi.Server({
  host: '192.168.23.61',
  port: '8080',
  routes: {
    cors: { origin: ['*'] },
  },
});

async function main() {
  await server.register([{
    plugin: require('./shifts-mock-api'),
    routes: { prefix: '/shifts' },
  }]);

  await server.start();

  console.info(`✅  API server is listening at ${server.info.uri.toLowerCase()}`);
}

main();
