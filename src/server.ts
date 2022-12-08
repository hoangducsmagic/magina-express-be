import * as Hapi from '@hapi/hapi';
import { config, errorHandler, logger } from './common';
import databases from './databases';
import plugins from './plugins';
import routes from './routes';

export const createServer = async () => {
  const server = Hapi.server({
    port: config.SERVER_PORT,
    host: config.SERVER_HOST,
    routes: {
      validate: {
        options: {
          abortEarly: false
        },
        failAction: errorHandler
      },
      cors: {
        origin: ['*'],
        additionalHeaders: ['x-profile-token']
      }
    }
  });

  await server.register(plugins);

  server.route(routes);

  return server;
};

const start = async () => {
  await databases.connect();

  const server = await createServer();

  await server.start();

  logger.info(`Server running on ${server.info.uri}`);

  return server;
};
start();
