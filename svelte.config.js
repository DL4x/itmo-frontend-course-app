import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
    kit: {
        adapter: adapter()
    },
    preprocess: vitePreprocess({
        script: true
    })
};

export default config;
