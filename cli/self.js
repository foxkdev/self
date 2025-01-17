#!/usr/bin/env node
import { Command } from 'commander';
import simpleGit from 'simple-git';
import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const program = new Command();
const git = simpleGit();

program
  .version('1.0.0')
  .description('CLI para ejecutar comandos de Git');


const buildDir = './builds'

if(!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}
// Comando para inicializar un repositorio
program
  .command('repo:create <url>')
  .description('Inicializar un repositorio git')
  .action(async (url) => {
    try {
      // await git.init();
  
      const name = url.split('/').pop().replace('.git', '');
      const tmpDir = `${name}-${Date.now()}`
      fs.mkdirSync(path.join(buildDir, tmpDir));

      console.log('Repositorio git inicializado: ' + url);
      const pathTmp = path.join(buildDir, tmpDir);
      await git.clone(url, pathTmp);

      console.log('Repositorio clonado en ' + pathTmp);

      // lanzar comando nixpacks
      // const execAsync = promisify(exec);
      // const { stdout, stderr } = await execAsync(`nixpacks build ${pathTmp} --name ${name}`);
      // console.log(stdout);

      const proceso = spawn('nixpacks', ['build', pathTmp, '--name', name]);

      // Maneja la salida del comando (stdout)
      proceso.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      // Maneja los errores del comando (stderr)
      proceso.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      // Detecta cuando el proceso ha terminado
      proceso.on('close', (code) => {
        console.log(`El proceso terminó con el código: ${code}`);
      });
    } catch (err) {
      console.error('Error al inicializar el repositorio', err);
    }
  });

program.parse(process.argv);
