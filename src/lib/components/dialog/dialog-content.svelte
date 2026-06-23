<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import DialogPortal from './dialog-portal.svelte';
	import DialogOverlay from './dialog-overlay.svelte';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils';
	import type { ComponentProps, Snippet } from 'svelte';
	import { tv, type VariantProps } from 'tailwind-variants';
	import { onMount } from 'svelte';
	import { getDialogOpenContext } from './dialog.svelte';
	import { animate } from 'motion';

	const dialogVariants = tv({
		base: 'fixed top-1/2 left-1/2 z-50 flex flex-col -translate-x-1/2 -translate-y-1/2 bg-dm-bg-primary border border-dm-border-subtle shadow-dm-elevated outline-none max-h-[90vh] overflow-hidden dialog-content',
		variants: {
			size: {
				small: 'max-h-[min(720px,100%)] w-full max-w-[400px]',
				medium: 'max-h-[min(800px,100%)] w-full max-w-[480px]',
				large: 'w-full max-w-[680px]',
				xlarge: 'w-full max-w-[960px]',
				xxlarge: 'w-full max-w-[1280px]'
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
		paddingSize = 'sm',
		showCloseButton = true,
		children,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DialogPortal>>;
		size?: SizeType;
		paddingSize?: 'sm' | 'lg';
		showCloseButton?: boolean;
		children?: Snippet;
	} = $props();

	const dialogState = getDialogOpenContext();
	let contentElement = $state<HTMLElement | null>(null);
	let isVisible = $state(false);
	let reducedMotion = $state(false);

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mediaQuery.matches;
		const listener = (e: MediaQueryListEvent) => {
			reducedMotion = e.matches;
		};
		mediaQuery.addEventListener('change', listener);
		return () => mediaQuery.removeEventListener('change', listener);
	});

	$effect(() => {
		const isOpen = dialogState?.open;
		if (isOpen) {
			isVisible = true;
		} else {
			if (contentElement && isVisible) {
				const animation = animate(contentElement, 
					{ 
						opacity: 0, 
						scale: reducedMotion ? 1 : 0.9 
					}, 
					{ 
						delay: 0, 
						type: 'spring', 
						mass: 1, 
						stiffness: 1200, 
						damping: 80 
					}
				);
				animation.then(() => {
					if (!dialogState?.open) {
						isVisible = false;
					}
				});
			}
		}
	});

	$effect(() => {
		if (dialogState?.open && contentElement) {
			animate(contentElement, 
				{ 
					opacity: [0, 1], 
					scale: reducedMotion ? [1, 1] : [0.9, 1] 
				}, 
				{ 
					delay: 0.064, 
					type: 'spring', 
					mass: 1, 
					stiffness: 1000, 
					damping: 48 
				}
			);
		}
	});
</script>

<DialogPortal {...portalProps}>
	<DialogOverlay />
	<DialogPrimitive.Content
		bind:ref
		forceMount={true}
		{...restProps}
	>
		{#snippet child({ props })}
			{#if isVisible}
				<div
					{...props}
					bind:this={contentElement}
					class={cn(
						dialogVariants({ size }),
						paddingSize === 'sm' 
							? '[--custom-modal-padding:var(--space-24)] [--custom-modal-padding-sm:var(--space-8)] [--custom-modal-padding-md:var(--space-16)] [--custom-modal-padding-top:var(--custom-modal-padding-sm)] [--custom-modal-padding-bottom:var(--custom-modal-padding-md)] [padding-top:var(--custom-modal-padding-top)] [padding-bottom:var(--custom-modal-padding-bottom)]' 
							: '[--custom-modal-padding:var(--space-32)] [--custom-modal-padding-sm:var(--space-16)] [--custom-modal-padding-md:var(--space-16)] [--custom-modal-padding-top:var(--custom-modal-padding-sm)] [--custom-modal-padding-bottom:var(--custom-modal-padding-md)] [padding-top:var(--custom-modal-padding-top)] [padding-bottom:var(--custom-modal-padding-bottom)]',
						className
					)}
				>
					{@render children?.()}
					{#if showCloseButton}
						<DialogPrimitive.Close
							class="absolute right-4 top-4 rounded-sm text-dm-text-muted hover:text-dm-interactive-hover opacity-50 hover:opacity-100 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-dm-brand cursor-pointer z-20"
						>
							<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
							<span class="sr-only">Close</span>
						</DialogPrimitive.Close>
					{/if}
				</div>
			{/if}
		{/snippet}
	</DialogPrimitive.Content>
</DialogPortal>

<style>
	.dialog-content {
		--custom-border-radius: 12px;
		border-radius: var(--custom-border-radius);
	}

	@media (max-width: 485px), (max-height: 550px) {
		.dialog-content {
			--custom-border-radius: 0 !important;
			border-radius: 0 !important;
			border: none !important;
			
			/* Full Screen on Mobile adjustments */
			width: 100% !important;
			height: 100% !important;
			max-width: 100% !important;
			max-height: 100% !important;
			top: 0 !important;
			left: 0 !important;
			transform: none !important;
		}
	}
</style>
