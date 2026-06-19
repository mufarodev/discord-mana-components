<script lang="ts" module>
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const messageRowVariants = tv({
		base: 'relative flex gap-4 px-4 py-[6px] pl-[72px] rounded-r transition-colors duration-100 ease-linear border-l-[3px] border-solid border-transparent hover:bg-dm-mod-muted',
		variants: {
			highlight: {
				none: '',
				mentioned: 'bg-[rgba(247,163,0,0.08)] border-dm-amber hover:bg-[rgba(247,163,0,0.12)]',
				ephemeral: 'bg-[rgba(89,102,242,0.1)] border-dm-brand hover:bg-[rgba(89,102,242,0.15)]',
				nitro: 'hover:bg-gradient-to-r hover:from-[rgba(133,44,255,0.2)] hover:to-[rgba(255,107,219,0.2)]'
			}
		},
		defaultVariants: {
			highlight: 'none'
		}
	});

	export type ChatMessageRowProps = HTMLAttributes<HTMLDivElement> &
		VariantProps<typeof messageRowVariants> & {
			avatar?: string;
			author?: string;
			timestamp?: string;
			authorColor?: string;
		};
</script>

<script lang="ts">
	let {
		class: className,
		highlight = 'none',
		avatar,
		author,
		timestamp,
		authorColor,
		children,
		...restProps
	}: ChatMessageRowProps = $props();
</script>

<div
	class={cn(messageRowVariants({ highlight }), className)}
	{...restProps}
>
	{#if avatar || author}
		<div class="absolute left-4 top-1.5 flex items-start">
			{#if avatar}
				<img src={avatar} alt={author} class="w-10 h-10 rounded-full object-cover" />
			{:else}
				<div class="w-10 h-10 rounded-full bg-dm-brand flex items-center justify-center text-white text-sm font-semibold select-none">
					{author?.slice(0, 2).toUpperCase() || 'DM'}
				</div>
			{/if}
		</div>
	{/if}

	<div class="flex flex-col w-full text-base font-dm-primary">
		{#if author || timestamp}
			<div class="flex items-baseline gap-2 mb-[2px]">
				{#if author}
					<span class="font-semibold text-dm-text-strong hover:underline cursor-pointer" style={authorColor ? `color: ${authorColor}` : undefined}>
						{author}
					</span>
				{/if}
				{#if timestamp}
					<span class="text-xs text-dm-text-muted select-none">
						{timestamp}
					</span>
				{/if}
			</div>
		{/if}
		<div class="text-dm-text leading-[1.375rem] break-words">
			{@render children?.()}
		</div>
	</div>
</div>
