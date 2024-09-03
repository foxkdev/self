import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { DockerManager, RepositoryManager } from '../../../infra/services/service.manager';
import { Service, SERVICE_STATUS } from '../../../infra/services/service';

const BUILD_BASE = './builds'; // /var/www -> asegurarse carpeta existe, crearla en setup de self.
export const POST: RequestHandler = async ({ request }) => {
	
  const { repository, build, domain, deploy } = await request.json();
  
  const name = repository.url.split('/').pop().replace('.git', '');
  const randomId = Math.random().toString(36).substring(7);
  const serviceId = `${name}-${randomId}`;

  const service = new Service({
    id: serviceId,
    name,
    domain,
    status: SERVICE_STATUS.SETUP,
    health: 'unknown',
    server: 'unknown',
    build: {
      method: build,
      path: `${BUILD_BASE}/${serviceId}`
    },
    deploy: {
      auto: deploy.auto || false,
      branch: deploy.branch || 'master'
    }
  });

  service.setRepository(repository);
  service.setup();


	return json({ id: service.id, status: service.status });
};