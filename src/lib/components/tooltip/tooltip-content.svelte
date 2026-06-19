<script lang="ts">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils';
	import TooltipPortal from './tooltip-portal.svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		side = 'top',
		children,
		portalProps,
		showArrow = true,
		...restProps
	}: TooltipPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof TooltipPortal>>;
		showArrow?: boolean;
		children?: Snippet;
	} = $props();
</script>

<TooltipPortal {...portalProps}>
	<TooltipPrimitive.Content
		bind:ref
		{sideOffset}
		{side}
		class={cn(
			'z-50 max-w-[200px] flex items-center gap-2 rounded-md bg-[#111214] border border-solid border-white/[0.08] shadow-dm-elevated text-[#dbdee1] text-center px-3 py-2 text-xs font-medium leading-[16px] relative select-none duration-100',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showArrow}
			<TooltipPrimitive.Arrow
				width={16}
				height={7}
				class="fill-[#111214] stroke-white/[0.08] z-50 drop-shadow-[0_-1px_0_rgba(255,255,255,0.08)]"
			/>
		{/if}
	</TooltipPrimitive.Content>
</TooltipPortal>
