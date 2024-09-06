import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { DockerManager, RepositoryManager } from '$infra/services/service.manager';
import { BRANCH_STATUS, Service, SERVICE_STATUS } from '$infra/services/service';
import { ServiceRepository } from '$infra/db/repository/service.repository';

const BUILD_BASE = './builds'; // /var/www -> asegurarse carpeta existe, crearla en setup de self.
export const POST: RequestHandler = async ({ request }) => {
	
  const { repository, build, domain, deploy } = await request.json();
  
  const name = repository.url.split('/').pop().replace('.git', '');
  const randomId = Math.random().toString(36).substring(7);
  const serviceId = `${name}-${randomId}`;


  const serviceRepository = new ServiceRepository();
  await serviceRepository.create({
    serviceId: serviceId,
    name: name,
    domain: domain,
    status: SERVICE_STATUS.SETUP,
    buildMethod: build,
    buildPath: `${BUILD_BASE}/${serviceId}`,
    repoUrl: repository.url,
    repoProvider: repository.provider,
    repoAuth: repository.auth,
    branches: {
      create: [
        {
          name: deploy.branch,
          autoDeploy: deploy.auto,
          status: BRANCH_STATUS.NO_DEPLOYED
        }
      ]
    }
  });


	return json({ id: serviceId, status: SERVICE_STATUS.SETUP });
};