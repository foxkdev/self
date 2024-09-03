import simpleGit from 'simple-git';

export class RepositoryManager {
  git: any;
  url: string;
  constructor({ url }) {
    this.git = simpleGit();
    this.url = url;
  }
  clone(path: string) {
    this.git.clone(this.url, path);
  }
  checkout(branch: string) {
    //check if branch exists
    this.git.checkout(branch);
  }
  pull() {
    this.git.pull();
  }
  fetch() {
    this.git.fetch();
  }

}