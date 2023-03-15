import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { splitVendorChunkPlugin } from "vite";

export default defineConfig({
	plugins: [sveltekit()],
	envPrefix: "DBX",
	resolve: {
		dedupe: ["svelte", "@deboxsoft/module-core"],
	},
	optimizeDeps: {
		include: ["@deboxsoft/module-client > eventemitter3", "classnames"],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: splitVendorChunkPlugin,
			},
		},
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
