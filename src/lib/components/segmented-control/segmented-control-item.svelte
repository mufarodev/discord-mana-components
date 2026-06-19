<script lang="ts" module>
	import { cn } from '$lib/utils';
	import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const segmentedControlItemVariants = tv({
		base: 'flex items-center justify-center cursor-pointer text-sm font-medium text-dm-text transition-all duration-75 ease-in bg-dm-bg-secondary hover:bg-dm-mod-muted select-none outline-none focus-visible:z-10 focus-visible:ring-1 focus-visible:ring-dm-brand',
		variants: {
			action: {
				default: 'data-[state=on]:bg-dm-bg-accent data-[state=on]:text-white',
				allow: 'data-[state=on]:bg-dm-green data-[state=on]:text-white',
				deny: 'data-[state=on]:bg-dm-red data-[state=on]:text-white'
			}
		},
		defaultVariants: {
			action: 'default'
		}
	});

	export type SegmentedControlItemProps = ComponentProps<typeof ToggleGroupPrimitive.Item> &
		VariantProps<typeof segmentedControlItemVariants>;
</script>

<script lang="ts">
	let {
		class: className,
		value,
		action = 'default',
		children,
		...restProps
	}: SegmentedControlItemProps = $props();

	let itemProps = $derived(restProps as any);
</script>

<ToggleGroupPrimitive.Item
	{value}
	class={cn(segmentedControlItemVariants({ action }), className)}
	{...itemProps}
>
	{#snippet child({ props, pressed })}
		<button {...props}>
			{@render children?.({ pressed })}
		</button>
	{/snippet}
</ToggleGroupPrimitive.Item>
