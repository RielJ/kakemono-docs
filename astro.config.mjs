// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

const site = 'https://kakemono.rielj.xyz';

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [
		starlight({
			// Fails the build on a broken internal link or #anchor.
			plugins: [starlightLinksValidator()],
			title: 'kakemono',
			description:
				'A wallpaper manager for macOS, Linux and Windows. New wallpapers from Wallhaven, Unsplash, Reddit, Bing, NASA APOD, any web page, or your own folders.',
			logo: { src: './src/assets/logo.svg', alt: 'kakemono' },
			favicon: '/favicon.svg',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/RielJ/kakemono' }],
			editLink: { baseUrl: 'https://github.com/RielJ/kakemono-docs/edit/main/' },
			lastUpdated: true,
			customCss: ['./src/styles/custom.css'],
			head: [
				// Share cards on X, LinkedIn, Discord and Slack. Starlight sets og:title and
				// og:description per page; the image is the same for every page.
				{ tag: 'meta', attrs: { property: 'og:image', content: `${site}/og.png` } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1280' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '640' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: `${site}/og.png` } },
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Install', slug: 'getting-started/install' },
						{ label: 'First start', slug: 'getting-started/first-start' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Sources', slug: 'guides/sources' },
						{ label: 'The picker', slug: 'guides/picker' },
						{ label: 'Changing wallpapers', slug: 'guides/changing-wallpapers' },
						{ label: 'Linux desktops', slug: 'guides/linux' },
						{ label: 'Status bars and hooks', slug: 'guides/bars-and-hooks' },
						{ label: 'Updating', slug: 'guides/updating' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Commands', slug: 'reference/commands' },
						{ label: 'Configuration', slug: 'reference/configuration' },
						{ label: 'Files', slug: 'reference/files' },
						{ label: 'Socket protocol', slug: 'reference/socket' },
					],
				},
				{ label: 'Troubleshooting', slug: 'troubleshooting' },
			],
		}),
	],
});
