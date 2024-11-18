import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
	},
	base: '/',
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'https://prd-extractor-server.onrender.com',
				changeOrigin: true,
			},
		},
	},
})
