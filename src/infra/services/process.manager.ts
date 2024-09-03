import { spawn } from 'child_process';

export class ProcessManager {

  execute(command: string, args: string[]) {
    const process = spawn(command, args);
    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    process.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }
}