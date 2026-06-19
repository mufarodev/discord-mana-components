<script lang="ts" module>
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const reactionVariants = tv({
		base: 'inline-flex items-center gap-1.5 h-6 px-1.5 border border-solid border-transparent rounded-lg cursor-pointer select-none transition-all duration-100 ease-linear shrink-0 mr-1 mb-1 outline-none focus-visible:ring-1 focus-visible:ring-dm-brand',
		variants: {
			reacted: {
				true: 'bg-[rgba(89,102,242,0.24)] border-dm-brand text-dm-brand font-semibold',
				false: 'bg-dm-mod-muted dark:bg-dm-mod-muted light:bg-[hsla(240,4%,61%,0.12)] text-dm-interactive-normal hover:bg-dm-mod-normal hover:border-dm-text-muted hover:text-dm-text-strong'
			}
		},
		defaultVariants: {
			reacted: false
		}
	});

	export type MessageReactionProps = HTMLAttributes<HTMLButtonElement> &
		VariantProps<typeof reactionVariants> & {
			emoji: string;
			count: number;
		};
</script>

<script lang="ts">
	let {
		class: className,
		reacted = false,
		emoji,
		count,
		...restProps
	}: MessageReactionProps = $props();
</script>

<button
	type="button"
	class={cn(reactionVariants({ reacted }), className)}
	{...restProps}
>
	<span class="text-[15px] leading-none shrink-0" data-slot="emoji">
		{emoji}
	</span>
	<span class="text-xs font-semibold tabular-nums shrink-0" data-slot="count">
		{count}
	</span>
</button>
