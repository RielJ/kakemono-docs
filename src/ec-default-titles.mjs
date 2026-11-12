// @ts-check
import { h, select } from '@expressive-code/core/hast';

/* Gives untitled blocks a label, so their frame header reads "Terminal", "PowerShell", or the
   file the snippet goes in, instead of sitting empty. A block with its own title keeps it.
   Every TOML snippet in these docs is kakemono's own config file. */

const CONFIG_TITLE = 'config.toml';

/** @type {Record<string, string>} */
const labels = {
	sh: 'Terminal',
	bash: 'Terminal',
	shell: 'Terminal',
	zsh: 'Terminal',
	powershell: 'PowerShell',
	ps1: 'PowerShell',
	pwsh: 'PowerShell',
	toml: CONFIG_TITLE,
};

/* Where config.toml lives, as listed on the Files and folders page. Shown when the reader
   hovers or focuses a config.toml label. */
const configPaths = [
	['macOS, Linux', '~/.config/kakemono/config.toml'],
	['Windows', '%APPDATA%\\kakemono\\config.toml'],
];

let tipCount = 0;

/** @returns {import('@expressive-code/core').ExpressiveCodePlugin} */
export function defaultTitles() {
	return {
		name: 'kakemono-default-titles',
		hooks: {
			preprocessMetadata: ({ codeBlock }) => {
				const label = labels[codeBlock.language];
				if (label && !codeBlock.props.title) codeBlock.props.title = label;
			},
			// Runs after the frames plugin has built the header, so the title element exists.
			postprocessRenderedBlockGroup: ({ renderedGroupContents }) => {
				for (const { codeBlock, renderedBlockAst } of renderedGroupContents) {
					if (codeBlock.props.title !== CONFIG_TITLE) continue;
					const header = select('figcaption.header', renderedBlockAst);
					const title = header && select('.title', header);
					if (!header || !title) continue;

					const id = `kk-config-path-${++tipCount}`;
					title.properties.tabIndex = 0;
					title.properties.ariaDescribedBy = id;
					header.children.push(
						h(
							'span',
							{ id, role: 'tooltip', className: ['kk-path-tip'] },
							configPaths.map(([os, path]) =>
								h('span', { className: ['kk-path-row'] }, [
									h('span', { className: ['kk-path-os'] }, os),
									h('code', path),
								]),
							),
						),
					);
				}
			},
		},
	};
}
