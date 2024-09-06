import prisma from '$infra/services/prisma';
import { Repository } from './repository';
import { SERVICE_STATUS } from '$infra/services/service';
export class ServiceRepository extends Repository {

  getModel() {
    return prisma.service;  
  }

  getToSetup() {
    return this.findAll({ status: SERVICE_STATUS.SETUP });
  }

  
}