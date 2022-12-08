import { ServerRoute } from '@hapi/hapi';
import { config } from './common/config';

const pingRoute: ServerRoute = {
  method: 'GET',
  path: `/${config.API_VERSION}/ping`,
  options: {
    auth: false,
    description: 'To test connection to the server',
    tags: ['api', 'Health Check'],
    handler: async () => {
      return 'Pong';
    }
  }
};

const routes: ServerRoute[] = [pingRoute];

export default routes;
