import { RepositoryManager } from './repository.manager';
import { DockerManager } from './docker.manager';

export const SERVICE_STATUS = {
  SETUP: 'setup',
  CLONING: 'cloning',
  CLONED: 'cloned',
  BUILDING: 'building',
  BUILDED: 'builded',
  DEPLOYING: 'deploying',
  DEPLOYED: 'deployed',
  STOPPED: 'stopped',
  REMOVED: 'removed'
}


export interface ServiceArgs {
  id: string;
  name: string;
  domain: string;
  status: string;
  health: string;
  server: string;
  build: {
    method: string;
    path: string;
  };
  deploy: {
    auto: boolean;
    branch: string;
  }
}
export class Service {
  id: string;
  name: string;
  domain: string;
  status: string;
  health: string;
  server: string;

  buildPath: string = '';
  buildMethod: string;
  deploy: {
    auto: boolean;
    branch: string;
  };

  repository: RepositoryManager | null = null;
  constructor({ id, name, domain, status, health, server, build, deploy }: ServiceArgs) {
    this.id = id;
    this.name = name;
    this.domain = domain;
    this.status = status;
    this.health = health;
    this.server = server;
    this.buildMethod = build.method;
    this.buildPath = build.path;
    this.deploy = {
      auto: deploy.auto,
      branch: deploy.branch
    }

  }
  setRepository(repository) {
    this.repository = new RepositoryManager(repository);
  }

  async setup() {
    this.status = SERVICE_STATUS.CLONING;
    console.log('STATUS:', this.status);
    // insert in DB
    // generate domain if required
    // get server to insert
    // clone repository inside the server
    if(!this.repository) {
      throw new Error('Repository not set');
    }
    await this.repository.clone(this.buildPath);
    // await this.repository.checkout(this.deploy.branch);
    this.status = SERVICE_STATUS.CLONED
    console.log('STATUS:', this.status);
    this.build();
    // console.log('STATUS:', this.status);
    // if(this.deploy.auto) {
    //   await this.autoDeploy();
    //   console.log('STATUS:', this.status);
    // }
    
  }

  build() {
    this.status = SERVICE_STATUS.BUILDING;
    console.log('STATUS:', this.status);
    const dockerManager = new DockerManager();
    if(this.buildMethod === 'nixpacks') {
      dockerManager.buildNixpacks(this.name, this.buildPath);
      console.log('BUILD METHOD', this.buildMethod);
    }else if (this.buildMethod === 'docker') {
      dockerManager.buildImage(this.name, this.buildPath);
    }
    // this.status = SERVICE_STATUS.BUILDED;
  }

  async autoDeploy() {
    this.status = SERVICE_STATUS.DEPLOYING;
    const dockerManager = new DockerManager();
    await dockerManager.deployService(this.name);
    this.status = SERVICE_STATUS.DEPLOYED;
  }
}