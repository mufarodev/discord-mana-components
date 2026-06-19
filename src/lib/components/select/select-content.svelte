<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import SelectPortal from './select-portal.svelte';
	import { cn, type WithoutChild } from '$lib/utils';
	import type { ComponentProps, Snippet } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		children,
		portalProps,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> & {
		portalProps?: ComponentProps<typeof SelectPortal>;
		children?: Snippet;
	} = $props();
</script>

<SelectPortal {...portalProps}>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		class={cn(
			'z-50 min-w-[var(--bits-select-anchor-width)] max-w-full overflow-hidden rounded-lg bg-dm-bg-secondary border border-solid border-dm-border-subtle shadow-dm-elevated p-1.5 duration-100',
			className
		)}
		{...restProps}
	>
		<SelectPrimitive.Viewport class="h-[var(--bits-select-anchor-height)] w-full">
			{@render children?.()}
		</SelectPrimitive.Viewport>
	</SelectPrimitive.Content>
</SelectPortal>
