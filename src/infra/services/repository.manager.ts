import simpleGit from 'simple-git';
import * as fs from 'fs';
export class RepositoryManager {
  git: any;
  url: string;
  path: string;
  auth: string;
  provider: string;
  constructor({ url, path, auth, provider }) {
    
    this.auth = auth;
    this.provider = provider;
    this.path = path;
    this.url = url;
    if(!fs.existsSync(this.path)) {
      this.git = simpleGit({
        progress({ method, stage, progress }) {
          console.log(`git.${method} ${stage} stage ${progress}% complete`);
       },
      });
    } else {
      this.git = simpleGit({
        baseDir: this.path,
        progress({ method, stage, progress }) {
          console.log(`git.${method} ${stage} stage ${progress}% complete`);
       },
      });
    }
  }
  async clone(path: string, branch: string) {
    await this.git.clone(this.url, this.path, { '--branch': branch});
    // this.git = simpleGit(path);
  }
  async checkout(branch: string) {
    //check if branch exists
    await this.git.checkout(branch);
  }

  getLastCommit(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.git.log((err, log) => {
        if (err) {
          console.error('Error obteniendo el historial de commits:', err);
          reject(err)
        } else {
          const lastCommitId = log.latest.hash; // Obtén el hash (ID) del último commit
          resolve(lastCommitId);
        }
      });
    })
     
  }
  pull() {
    this.git.pull();
  }
  fetch() {
    this.git.fetch();
  }

}