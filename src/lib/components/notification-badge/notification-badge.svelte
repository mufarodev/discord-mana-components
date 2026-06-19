<script lang="ts" module>
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const badgeVariants = tv({
		base: 'flex items-center justify-center font-semibold text-white leading-none shrink-0 select-none font-dm-primary',
		variants: {
			variant: {
				dot: 'w-2 h-2 rounded-full bg-dm-text-muted',
				number: 'h-4 min-h-[16px] min-w-[16px] text-[12px] bg-dm-badge rounded-full px-1.5'
			}
		},
		defaultVariants: {
			variant: 'number'
		}
	});

	export type NotificationBadgeProps = HTMLAttributes<HTMLSpanElement> &
		VariantProps<typeof badgeVariants> & {
			count?: number;
			max?: number;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'number',
		count,
		max = 99,
		...restProps
	}: NotificationBadgeProps = $props();

	let displayCount = $derived(
		count !== undefined && count > max ? `${max}+` : count
	);

	let finalVariant = $derived(count === undefined ? 'dot' : variant);
</script>

<span
	class={cn(badgeVariants({ variant: finalVariant }), className)}
	data-slot="notification-badge"
	{...restProps}
>
	{#if finalVariant === 'number'}
		{displayCount}
	{/if}
</span>
