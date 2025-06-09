import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    assetsInclude: ['**/*.json'],
    plugins: [tailwindcss(), enhancedImages(), sveltekit()]
});
