import {
	defineConfig
} from 'vite';
export default defineConfig({
	// Root directory
	// 根目录
	root: 'client',
	// Base URL
	// 基础 URL
	base: './',
	// Plugins
	// 插件
	plugins: [],
	// Build options
	// 构建选项
	build: {
		// Output directory
		// 输出目录
		outDir: '../dist',
		// Empty output directory
		// 清空输出目录
		emptyOutDir: true,
		// Minify
		// 压缩
		minify: 'terser',
		// Terser options
		// Terser 选项
		terserOptions: {
			compress: {
				// Drop console statements
				// 删除 console 语句
				drop_console: false,
				// Drop debugger statements
				// 删除 debugger 语句
				drop_debugger: false
			}
		},
		// Rollup options
		// Rollup 选项
		rollupOptions: {			// Input file
			// 输入文件
			input: 'client/index.html',
			// Output options
			// 输出选项
			output: {
				// Manual chunks
				// 手动分块
				manualChunks: (id) => {
					if (id.includes('node_modules')) {
						if (/aes-js|elliptic|js-chacha20|js-sha256/.test(id)) {
							return 'crypto-libs'
						}
						return 'vendor-deps'
					}
					return undefined
				},
			},
		},
		// Sourcemap
		// Sourcemap
		sourcemap: false,
		// CSS code split
		// CSS 代码分割
		cssCodeSplit: true,
		// Chunk size warning limit
		// 代码块大小警告限制
		chunkSizeWarningLimit: 1000,
	},
	// Resolve options
	// 解析选项
	resolve: {
		// Alias
		// 别名
		alias: {
			buffer: 'buffer',
		},
	},
	// Server options
	// 服务器选项
	server: {
		// HMR
		// 热模块替换
		hmr: true,
		// Open browser
		// 打开浏览器
		open: true,
	},
	// Optimize dependencies
	// 优化依赖
	optimizeDeps: {
		// Include
		// 包含
		include: ['buffer', 'aes-js', 'elliptic', 'js-chacha20', 'js-sha256', '@dicebear/core', '@dicebear/micah'],
	},
});