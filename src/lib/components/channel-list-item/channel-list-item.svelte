<script lang="ts" module>
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const channelVariants = tv({
		base: 'group/channel relative flex items-center justify-between min-h-[34px] px-2 py-1.5 rounded-md cursor-pointer select-none transition-colors duration-100 ease-linear font-dm-primary',
		variants: {
			state: {
				default: 'text-[#9999a1] dark:text-[#9999a1] light:text-[#666670] hover:bg-dm-mod-muted hover:text-dm-interactive-hover',
				unread: 'text-dm-text-strong hover:bg-dm-mod-muted',
				selected: 'bg-dm-mod-strong text-dm-interactive-active',
				muted: 'text-dm-text-muted/50 hover:bg-dm-mod-muted hover:text-dm-text-muted/70'
			}
		},
		defaultVariants: {
			state: 'default'
		}
	});

	export type ChannelListItemProps = HTMLAttributes<HTMLDivElement> &
		VariantProps<typeof channelVariants> & {
			name: string;
			type?: 'text' | 'voice' | 'stage' | 'category';
		};
</script>

<script lang="ts">
	let {
		class: className,
		state = 'default',
		name,
		type = 'text',
		children,
		...restProps
	}: ChannelListItemProps = $props();
</script>

<div
	class={cn(channelVariants({ state }), className)}
	{...restProps}
>
	{#if state === 'unread'}
		<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2 rounded-r bg-[#9999a1] dark:bg-[#9999a1] light:bg-[#666670]" data-slot="unread-pill"></div>
	{/if}

	<div class="flex items-center gap-1.5 min-w-0">
		{#if type === 'text'}
			<svg class="h-[20px] w-[20px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="4" y1="9" x2="20" y2="9"></line>
				<line x1="4" y1="15" x2="20" y2="15"></line>
				<line x1="10" y1="3" x2="8" y2="21"></line>
				<line x1="16" y1="3" x2="14" y2="21"></line>
			</svg>
		{:else if type === 'voice'}
			<svg class="h-[20px] w-[20px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
				<path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
			</svg>
		{:else if type === 'stage'}
			<svg class="h-[20px] w-[20px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
				<path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
				<line x1="12" y1="19" x2="12" y2="22"></line>
			</svg>
		{:else if type === 'category'}
			<svg class="h-3 w-3 shrink-0 text-dm-text-muted transition-transform duration-100 ease-out group-data-[state=open]/channel:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		{/if}

		<span class={cn(
			'truncate text-[15px] leading-5 shrink-1 font-medium',
			type === 'category' ? 'text-xs uppercase tracking-[0.02em] font-bold text-dm-text-muted' : ''
		)}>
			{name}
		</span>
	</div>

	{#if children}
		<div class="flex items-center gap-1.5 opacity-0 group-hover/channel:opacity-100 transition-opacity duration-75 shrink-0 ml-2" data-slot="channel-actions">
			{@render children()}
		</div>
	{/if}
</div>
