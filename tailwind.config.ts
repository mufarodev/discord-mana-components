import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'dm-brand': 'var(--dm-brand)',
				'dm-brand-hover': 'var(--dm-brand-hover)',
				'dm-brand-active': 'var(--dm-brand-active)',
				'dm-brand-accent': 'var(--dm-brand-accent)',
				'dm-bg-primary': 'var(--dm-bg-primary)',
				'dm-bg-secondary': 'var(--dm-bg-secondary)',
				'dm-bg-tertiary': 'var(--dm-bg-tertiary)',
				'dm-bg-accent': 'var(--dm-bg-accent)',
				'dm-bg-input': 'var(--dm-bg-input)',
				'dm-bg-elevated': 'var(--dm-bg-elevated)',
				'dm-mod-muted': 'var(--dm-mod-muted)',
				'dm-mod-normal': 'var(--dm-mod-normal)',
				'dm-mod-strong': 'var(--dm-mod-strong)',
				'dm-text': 'var(--dm-text)',
				'dm-text-strong': 'var(--dm-text-strong)',
				'dm-text-muted': 'var(--dm-text-muted)',
				'dm-text-link': 'var(--dm-text-link)',
				'dm-interactive-normal': 'var(--dm-interactive-normal)',
				'dm-interactive-hover': 'var(--dm-interactive-hover)',
				'dm-interactive-active': 'var(--dm-interactive-active)',
				'dm-border-normal': 'var(--dm-border-normal)',
				'dm-border-subtle': 'var(--dm-border-subtle)',
				'dm-border-strong': 'var(--dm-border-strong)',
				'dm-red': 'var(--dm-red)',
				'dm-red-hover': 'var(--dm-red-hover)',
				'dm-red-active': 'var(--dm-red-active)',
				'dm-green': 'var(--dm-green)',
				'dm-green-hover': 'var(--dm-green-hover)',
				'dm-green-active': 'var(--dm-green-active)',
				'dm-amber': 'var(--dm-amber)',
				'dm-status-online': 'var(--dm-status-online)',
				'dm-status-idle': 'var(--dm-status-idle)',
				'dm-status-dnd': 'var(--dm-status-dnd)',
				'dm-status-offline': 'var(--dm-status-offline)',
				'dm-scrollbar-thumb': 'var(--dm-scrollbar-thumb)',
				'dm-badge': 'var(--dm-badge)'
			},
			fontFamily: {
				display: ['var(--dm-font-display)'],
				primary: ['var(--dm-font-primary)'],
				code: ['var(--dm-font-code)']
			},
			boxShadow: {
				'dm-elevated': 'inset 0 0 0 1px var(--dm-shadow-outline), 0 8px 16px rgb(0 0 0 / 0.24)',
				'dm-surface': '0 0 0 1px var(--dm-border-subtle)'
			}
		}
	},
	plugins: []
} satisfies Config;
