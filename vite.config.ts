import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteCronJobs } from './src/svelte-cronjobs/svelte-cronjobs';

export default defineConfig({
	plugins: [sveltekit(), svelteCronJobs()],
	resolve: {
		alias: {
			$infra: '/src/infra',
			$lib: '/src/lib',
			$components: '/src/lib/components',
		}
	},
});
