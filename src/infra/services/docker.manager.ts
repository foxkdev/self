import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import { ProcessManager } from './process.manager';

export class DockerManager {
  process: ProcessManager;
  constructor() {
    this.process = new ProcessManager();
  }
  async buildNixpacks(name: string, path: string, tag: string) {
    // spawn('nixpacks', ['build', path, '--name', name]);
    await this.process.execute('nixpacks', ['build', path, '--name', name, '--tag', tag]);
  }
  buildImage(name: string, path: string, tag: string) {
    spawn('docker', ['build', '-t', name, path]);
  }
  async deployService(name: string) {
    // spawn('docker', ['run', '-it', name]);
    await this.process.execute('docker', ['run', '-it', name]);
  }
  stopService(name: string) {
    spawn('docker', ['stop', name]);
  }

  restartService(name: string) {
    spawn('docker', ['restart', name]);
  }

  removeService(name: string) {
    spawn('docker', ['rm', name]);
  }
}