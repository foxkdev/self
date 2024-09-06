import { RepositoryManager } from './repository.manager';
import { DockerManager } from './docker.manager';

export const SERVICE_STATUS = {
  SETUP: 0,
  CLONING: 1,
  CLONED: 2,
  BUILDING: 3,
  BUILT: 4,
  DEPLOYING: 5,
  DEPLOYED: 6,
  ERROR: 7,
  STOPED: 8,
};

export const BRANCH_STATUS = {
  NO_DEPLOYED: 0,
  DEPLOYED: 1,
}


export interface ServiceArgs {
  id: string;
  name: string;
  domain: string;
  status: number;
  health: string;
  server: string;
  build: {
    method: string;
    path: string;
  };
  deploy: {
    auto: boolean;
    branch: string;
    commit: string;
  }
}
export class Service {
  id: string;
  name: string;
  domain: string;
  status: number;
  health: string;
  server: string;

  buildPath: string = '';
  buildMethod: string;
  deploy: {
    auto: boolean;
    branch: string;
    commit: string;
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
      branch: deploy.branch,
      commit: deploy.commit
    }

  }
  setRepository(repository) {
    this.repository = new RepositoryManager(repository);
  }

  async clone() {
    if(!this.repository) {
      throw new Error('Repository not set');
    }
    await this.repository.clone(this.buildPath, this.deploy.branch);
  }

  async build() {
    const lastCommit = await this.getLastCommit();
    const tag = this.name + ':' + lastCommit.substring(0, 7);
    const dockerManager = new DockerManager();
    if(this.buildMethod === 'nixpacks') {
      await dockerManager.buildNixpacks(this.name, this.buildPath, tag);
    }else if (this.buildMethod === 'docker') {
      await dockerManager.buildImage(this.name, this.buildPath, tag);
    }
    return tag;
  }
  getLastCommit() {
    if(!this.repository) {
      throw new Error('Repository not set');
    }
    return this.repository.getLastCommit();
  }
  async deployService(tag) {
    const dockerManager = new DockerManager();
    await dockerManager.deployService(tag);
  }
}