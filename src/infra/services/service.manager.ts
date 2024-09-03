

export class ServiceManager {
  buildBase: string = '';
  constructor() {
    this.buildBase = './builds'; // /var/www -> asegurarse carpeta existe, crearla en setup de self.
  }
  getName(repository) {
    return repository.url.split('/').pop().replace('.git', '');
  }

  getRandomId() {
    return Math.random().toString(36).substring(7);
  }
  setupRepository({ repository, build, domain}) {
    const name = this.getName(repository);
    const serviceId = `${name}-${this.getRandomId}`;

    const service = new Service({
      id: serviceId,
      name,
      domain,
      status: SERVICE_STATUS.SETUP,
      health: 'unknown',
      server: 'unknown',
      build: {
        method: build,
        buildPath: `${this.buildBase}/${serviceId}`
      }
    });

    service.setRepository(repository);
    service.setup();
    
    // update DB status
  }
}