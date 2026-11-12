// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import { defaultTitles } from './src/ec-default-titles.mjs';

const site = 'https://kakemono.rielj.xyz';

// https://astro.build/config
export default defineConfig({
	site,
	// Pages that moved when the docs were simplified.
	redirects: {
		'/getting-started/install/': '/install/',
		'/getting-started/first-start/': '/using/',
		'/guides/install-options/': '/install/other/',
	},
	integrations: [
		starlight({
			// Fails the build on a broken internal link or #anchor.
			plugins: [starlightLinksValidator({ exclude: ['/'] })],
			// Highlights Install in the sidebar on the /install/* pages, which aren't listed there.
			routeMiddleware: './src/routeData.ts',
			title: 'kakemono',
			description:
				'A wallpaper manager for macOS, Linux and Windows. New wallpapers from Wallhaven, Unsplash, Reddit, Bing, NASA APOD, any web page, or your own folders.',
			// The wordmark already spells the name, so it replaces the title text.
			logo: {
				light: './src/assets/kakemono-wordmark-light.png',
				dark: './src/assets/kakemono-wordmark-dark.png',
				alt: 'kakemono',
				replacesTitle: true,
			},
			favicon: '/favicon.svg',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/RielJ/kakemono' }],
			editLink: { baseUrl: 'https://github.com/RielJ/kakemono-docs/edit/main/' },
			lastUpdated: true,
			components: {
				PageTitle: './src/components/PageTitle.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			// Code sits on a dark panel in both themes, as on tailwindcss.com. The frame around it
			// (label row, inset panel) is styled in custom.css.
			expressiveCode: {
				themes: ['github-dark-default'],
				plugins: [defaultTitles()],
				useStarlightUiThemeColors: false,
				styleOverrides: {
					borderRadius: '0.75rem',
					borderColor: 'rgb(255 255 255 / 0.1)',
					codeBackground: '#1a1d25',
					codeFontFamily: "'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace",
					codeFontSize: '0.875rem',
					codePaddingBlock: '1rem',
					codePaddingInline: '1.25rem',
					uiFontFamily: "'Inter Variable', ui-sans-serif, system-ui, sans-serif",
					uiFontSize: '0.8125rem',
					frames: {
						frameBoxShadowCssValue: 'none',
						editorBackground: '#1a1d25',
						editorTabBarBackground: '#030712',
						editorActiveTabBackground: '#030712',
						editorActiveTabIndicatorTopColor: 'transparent',
						editorActiveTabIndicatorBottomColor: 'transparent',
						editorTabBarBorderBottomColor: 'rgb(255 255 255 / 0.1)',
						terminalBackground: '#1a1d25',
						terminalTitlebarBackground: '#030712',
						terminalTitlebarForeground: '#99a1af',
						terminalTitlebarDotsOpacity: '0',
						terminalTitlebarBorderBottomColor: 'rgb(255 255 255 / 0.1)',
					},
				},
			},
			customCss: [
				'@fontsource-variable/inter/wght.css',
				'@fontsource/ibm-plex-mono/latin-400.css',
				'@fontsource/ibm-plex-mono/latin-500.css',
				'@fontsource/ibm-plex-mono/latin-600.css',
				'./src/styles/tokens.css',
				'./src/styles/custom.css',
			],
			head: [
				// Share cards on X, LinkedIn, Discord and Slack. Starlight sets og:title and
				// og:description per page; the image is the same for every page.
				{ tag: 'meta', attrs: { property: 'og:image', content: `${site}/og.png` } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1280' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '640' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: `${site}/og.png` } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
			],
			// Four pages for everyone; the rest sits in a collapsed group below them.
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Install', slug: 'install' },
						{ label: 'How to use kakemono', slug: 'using' },
						{ label: 'Where pictures come from', slug: 'sources' },
						{ label: 'Help', slug: 'help' },
					],
				},
				{
					label: 'Advanced',
					collapsed: true,
					items: [
						{ label: 'Sources in detail', slug: 'guides/sources' },
						{ label: 'The picker', slug: 'guides/picker' },
						{ label: 'Timer, history and filters', slug: 'guides/changing-wallpapers' },
						{ label: 'Updating', slug: 'guides/updating' },
						{ label: 'Linux desktops', slug: 'guides/linux' },
						{ label: 'Status bars and hooks', slug: 'guides/bars-and-hooks' },
						{ label: 'Commands', slug: 'reference/commands' },
						{ label: 'Configuration file', slug: 'reference/configuration' },
						{ label: 'Files and folders', slug: 'reference/files' },
						{ label: 'Socket protocol', slug: 'reference/socket' },
						{ label: 'Troubleshooting', slug: 'troubleshooting' },
					],
				},
			],
		}),
	],
});
