import type { Plugin } from 'vite';
import { CronJob } from 'cron';
import fs from 'fs';
import path from 'path';

export interface svelteCronJobsOptions {
  directoryJobs?: string;
  onCallback?: () => void;
}
async function load(args?: svelteCronJobsOptions, server)  {
  const basePath = path.resolve(args?.directoryJobs || 'src/jobs');
  const jobs: CronJob[] = [];
  const files = fs.readdirSync(basePath);

  for (const file of files) {
    const module = await server.ssrLoadModule(path.join(basePath, file));
    const name = module.name;
    const schedule = module.schedule;
    const onTick = module.onTick;

    try {
      const cronJob = new CronJob(schedule, onTick);
      console.log(`✅ Registered job: ${name}`);
      jobs.push(cronJob);
    } catch (err) {
      console.log(`❌ Failed to create job: ${name}\n${err}`);
    }
    
  }
  return jobs;
}
export function svelteCronJobs(args?: svelteCronJobsOptions): Plugin {

  // const basePath = path.resolve(args?.directoryJobs || 'src/jobs');
  // const jobs: CronJob[] = [];
  // const files = fs.readdirSync(basePath);

  // for (const file of files) {
  //   // const module = server.
  //   import(path.join(basePath, file))
  //     .then((module) => {
  //       const name = module.name;
  //       const schedule = module.schedule;
  //       const onTick = module.onTick;

  //       try {
  //         const cronJob = new CronJob(schedule, onTick);
  //         console.log(`✅ Registered job: ${name}`);
  //         jobs.push(cronJob);
  //       } catch (err) {
  //         console.log(`❌ Failed to create job: ${name}\n${err}`);
  //       }
  //     });
    
  // }

  return {
    name: 'svelte-cronjobs',
    configureServer(server) {
      server.httpServer?.once('listening', async () => {
        console.log('🚀 Starting cron jobs');
        const jobs = await load(args, server);
        for (const job of jobs) {
          if(args?.onCallback) {
            job.addCallback(args.onCallback);
          }
          job.start();
        }
      });
      
    },
    closeBundle() {
      // for (const job of jobs) {
      //   job.stop();
      // }
    }
  }
}