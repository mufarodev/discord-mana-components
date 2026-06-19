<script lang="ts" module>
	import { cn } from '$lib/utils';
	import { ScrollArea as ScrollAreaPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const scrollAreaVariants = tv({
		base: 'relative overflow-hidden w-full h-full',
		variants: {
			variant: {
				thin: 'group/scroll-thin',
				fade: 'group/scroll-fade'
			}
		},
		defaultVariants: {
			variant: 'thin'
		}
	});

	export type ScrollAreaProps = ComponentProps<typeof ScrollAreaPrimitive.Root> &
		VariantProps<typeof scrollAreaVariants>;
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'thin',
		children,
		...restProps
	}: ScrollAreaProps = $props();
</script>

<ScrollAreaPrimitive.Root
	class={cn(scrollAreaVariants({ variant }), className)}
	{...restProps}
>
	<ScrollAreaPrimitive.Viewport class="h-full w-full rounded-[inherit] outline-none">
		{@render children?.()}
	</ScrollAreaPrimitive.Viewport>

	<ScrollAreaPrimitive.Scrollbar
		orientation="horizontal"
		class={cn(
			'flex touch-none select-none p-0.5 transition-opacity duration-150 ease-out h-2',
			variant === 'fade' ? 'opacity-0 group-hover/scroll-fade:opacity-100' : ''
		)}
	>
		<ScrollAreaPrimitive.Thumb
			class="relative flex-1 rounded-full bg-dm-scrollbar-thumb/50 hover:bg-dm-scrollbar-thumb transition-colors duration-150"
		/>
	</ScrollAreaPrimitive.Scrollbar>

	<ScrollAreaPrimitive.Scrollbar
		orientation="vertical"
		class={cn(
			'flex touch-none select-none p-0.5 transition-opacity duration-150 ease-out w-2',
			variant === 'fade' ? 'opacity-0 group-hover/scroll-fade:opacity-100' : ''
		)}
	>
		<ScrollAreaPrimitive.Thumb
			class="relative flex-1 rounded-full bg-dm-scrollbar-thumb/50 hover:bg-dm-scrollbar-thumb transition-colors duration-150"
		/>
	</ScrollAreaPrimitive.Scrollbar>

	<ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>
