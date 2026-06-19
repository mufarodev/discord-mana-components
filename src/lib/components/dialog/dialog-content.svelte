<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import DialogPortal from './dialog-portal.svelte';
	import DialogOverlay from './dialog-overlay.svelte';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils';
	import type { ComponentProps, Snippet } from 'svelte';
	import { tv, type VariantProps } from 'tailwind-variants';

	const dialogVariants = tv({
		base: 'fixed top-1/2 left-1/2 z-50 flex flex-col -translate-x-1/2 -translate-y-1/2 bg-dm-bg-primary border border-dm-border-normal rounded-lg shadow-dm-elevated outline-none max-h-[90vh] overflow-hidden',
		variants: {
			size: {
				small: 'max-h-[720px] min-h-[220px] w-[442px]',
				medium: 'max-h-[800px] min-h-[400px] w-[602px]',
				large: 'min-h-[400px] max-w-[962px] min-w-[800px] w-full'
			}
		},
		defaultVariants: {
			size: 'medium'
		}
	});

	type SizeType = VariantProps<typeof dialogVariants>['size'];

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		size = 'medium',
		showCloseButton = true,
		children,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DialogPortal>>;
		size?: SizeType;
		showCloseButton?: boolean;
		children?: Snippet;
	} = $props();
</script>

<DialogPortal {...portalProps}>
	<DialogOverlay />
	<DialogPrimitive.Content
		bind:ref
		class={cn(dialogVariants({ size }), className)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close
				class="absolute right-4 top-4 rounded-sm text-dm-text-muted hover:text-dm-interactive-hover opacity-50 hover:opacity-100 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-dm-brand cursor-pointer"
			>
				<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
				<span class="sr-only">Close</span>
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</DialogPortal>
