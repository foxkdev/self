import { error, json } from '@sveltejs/kit';
import prisma from '$infra/services/prisma';
import type { RequestHandler } from './$types';
import { ServiceRepository } from '$infra/db/repository/service.repository';
import { Service, SERVICE_STATUS } from '$infra/services/service';

export const POST: RequestHandler = async ({ request }) => {
	
  // const { } = await request.json();
  const serviceRepository = new ServiceRepository();

  const services = await serviceRepository.findAll({
    status: {
      in: [SERVICE_STATUS.SETUP, SERVICE_STATUS.CLONED, SERVICE_STATUS.BUILT]
    }
  });
  for(const service of services) {
    // service.setup();
    console.log('SERVICE', service)
    const srv = new Service({
      id: service.serviceId,
      name: service.name,
      domain: service.domain,
      status: service.status,
      health: 'unknown',
      server: 'unknown',
      build: {
        method: service.buildMethod,
        path: service.buildPath
      },
      deploy: {
        auto: service.autoDeploy,
        branch: service.branch
      }
    })
    srv.setRepository({ url: service.repoUrl, path: service.buildPath, auth: service.repoAuth, provider: service.repoProvider });

    if(service.status === SERVICE_STATUS.SETUP) {
      await serviceRepository.update(service.serviceId, {
        status: SERVICE_STATUS.CLONING
      });
      await srv.clone();
      await serviceRepository.update(service.serviceId, {
        status: SERVICE_STATUS.CLONED
      });
    } else if(service.status === SERVICE_STATUS.CLONED) {
      // BUILD
      await serviceRepository.update(service.serviceId, {
        status: SERVICE_STATUS.BUILDING
      });
      srv.build().then(() => {
        serviceRepository.update(service.serviceId, {
          status: SERVICE_STATUS.BUILT
        });
      });
    } else if(service.status === SERVICE_STATUS.BUILT) {

    }
  }

	return json({ services });
};