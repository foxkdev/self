import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$infra: '/src/infra',
			$lib: '/src/lib',
			$components: '/src/lib/components',
		}
	}
});
