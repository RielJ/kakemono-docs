import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import type { StarlightRouteData } from '@astrojs/starlight/route-data';

type Entry = StarlightRouteData['sidebar'][number];
type Link = Extract<Entry, { type: 'link' }>;

const findLink = (entries: Entry[], href: string): Link | undefined => {
	for (const e of entries) {
		if (e.type === 'link' && e.href === href) return e;
		if (e.type === 'group') {
			const found = findLink(e.entries, href);
			if (found) return found;
		}
	}
	return undefined;
};

// The pages under /install/ (Homebrew, Mac, Scoop...) aren't in the sidebar, so Starlight
// highlights nothing and shows no prev/next. Treat them as part of Install: highlight it,
// go back to it with "Previous", and go on to "How to use kakemono" with "Next".
export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;

	// A page without headings would show an "On this page" column holding only "Overview".
	// Drop it, so the column appears only where it helps someone jump around the page.
	const items = route.toc?.items ?? [];
	if (items.length <= 1 && (items[0]?.children.length ?? 0) === 0) route.toc = undefined;

	if (!route.id.startsWith('install/')) return;

	const install = findLink(route.sidebar, '/install/');
	if (!install) return;
	install.isCurrent = true;

	route.pagination = {
		prev: { ...install, isCurrent: false, label: 'All ways to install' },
		next: findLink(route.sidebar, '/using/'),
	};
});
