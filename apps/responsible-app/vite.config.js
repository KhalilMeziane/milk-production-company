import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

export default defineConfig({
    plugins: [
        react(),
        chunkSplitPlugin()
    ],
    resolve: {
        alias: [
            {
                find: '@pages',
                replacement: path.resolve(__dirname, 'src/pages')
            },
            {
                find: '@assets',
                replacement: path.resolve(__dirname, 'src/assets')
            },
            {
                find: '@navigation',
                replacement: path.resolve(__dirname, 'src/navigation')
            },
            {
                find: '@components',
                replacement: path.resolve(__dirname, 'src/components')
            },
            {
                find: '@config',
                replacement: path.resolve(__dirname, 'src/config')
            },
            {
                find: '@store',
                replacement: path.resolve(__dirname, 'src/store')
            },
            {
                find: '@services',
                replacement: path.resolve(__dirname, 'src/services')
            }
        ]
    },
    build: {
        outDir: 'dist'
    }
})
