import prisma from '$infra/services/prisma';


export class Repository {
  model: any;

  constructor() {
    this.model = this.getModel();
  }

  getModel() {
    throw new Error('Method not implemented.');
  }

  async create(data) {
    return await this.model.create({
      data
    });
  }

  async update(id, data) {
    // update model
    return await this.model.update({
      where: {
        serviceId: id 
      },
      data
    });
  }

  async delete(id) {
    // delete model
  }

  async find(id) {
    // find model
  }

  async findAll(where = {}, include = {}, orderBy = {}) {
    return await this.model.findMany({
      where,
      include,
      orderBy
    });
  }
}