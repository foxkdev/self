import { error, json } from '@sveltejs/kit';
import prisma from '$infra/services/prisma';
import type { RequestHandler } from './$types';
import { ServiceRepository } from '$infra/db/repository/service.repository';
import { BRANCH_STATUS, Service, SERVICE_STATUS } from '$infra/services/service';

export const POST: RequestHandler = async ({ request }) => {
	
  // const { } = await request.json();
  const serviceRepository = new ServiceRepository();

  const services = await serviceRepository.findAll({
    status: {
      in: [SERVICE_STATUS.SETUP, SERVICE_STATUS.CLONED, SERVICE_STATUS.BUILT]
    }
  }, { branches: true });
  for(const service of services) {
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
        auto: service.branches[0].autoDeploy,
        branch: service.branches[0].name,
        commit: service.branches[0].commitDeployed
      }
    })
    srv.setRepository({ url: service.repoUrl, path: service.buildPath, auth: service.repoAuth, provider: service.repoProvider });

    if(service.status === SERVICE_STATUS.SETUP) {
      // CLONE
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
      srv.build().then((tag) => {
        serviceRepository.update(service.serviceId, {
          status: SERVICE_STATUS.BUILT,
          branches: {
            update: {
              where: {
                id: service.branches[0].id
              },
              data: {
                commitDeployed: tag,
              }
            }
          }
        });
      });
    } else if(service.status === SERVICE_STATUS.BUILT) {
      // AUTO DEPLOY
      if(srv.deploy.auto) {
        await serviceRepository.update(service.serviceId, {
          status: SERVICE_STATUS.DEPLOYING
        });
        srv.deployService(srv.deploy.commit); // WE CAN CHEK WHEN CLOSE TO ERROR?

        serviceRepository.update(service.serviceId, {
            status: SERVICE_STATUS.DEPLOYED,
            branches: {
              update: {
                where: {
                  id: service.branches[0].id
                },
                data: {
                  status: BRANCH_STATUS.DEPLOYED
                }
              }
            }
          });
      }
    }
  }

	return json({ services });
};