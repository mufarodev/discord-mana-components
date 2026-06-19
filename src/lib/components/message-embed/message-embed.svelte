<script lang="ts" module>
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	export type MessageEmbedProps = HTMLAttributes<HTMLDivElement> & {
		title?: string;
		description?: string;
		author?: string;
		provider?: string;
		accentColor?: string;
	};
</script>

<script lang="ts">
	let {
		class: className,
		title,
		description,
		author,
		provider,
		accentColor,
		children,
		...restProps
	}: MessageEmbedProps = $props();
</script>

<div
	class={cn(
		'grid max-w-[520px] rounded bg-dm-bg-primary border border-solid border-dm-border-subtle pl-3 pr-4 pt-2 pb-4 border-l-4 relative font-dm-primary',
		className
	)}
	style={accentColor ? `border-left-color: ${accentColor}` : 'border-left-color: var(--dm-border-normal)'}
	{...restProps}
>
	<div class="flex flex-col gap-1.5 text-sm leading-[1.125rem]">
		{#if provider}
			<span class="text-xs font-normal text-dm-text-muted">
				{provider}
			</span>
		{/if}
		{#if author}
			<span class="text-[0.875rem] font-semibold text-dm-text-strong hover:underline cursor-pointer">
				{author}
			</span>
		{/if}
		{#if title}
			<span class="text-base font-bold text-dm-text-strong hover:text-dm-text-link hover:underline cursor-pointer leading-5">
				{title}
			</span>
		{/if}
		{#if description}
			<p class="text-[14px] text-dm-text font-normal leading-[1.125rem] whitespace-pre-wrap break-words">
				{description}
			</p>
		{/if}
		{#if children}
			<div class="mt-2 text-dm-text">
				{@render children()}
			</div>
		{/if}
	</div>
</div>
