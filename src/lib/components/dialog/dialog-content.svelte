<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import DialogPortal from './dialog-portal.svelte';
	import DialogOverlay from './dialog-overlay.svelte';
	import { cn, type WithoutChildrenOrChild } from '$lib/utils';
	import type { ComponentProps, Snippet } from 'svelte';
	import { tv, type VariantProps } from 'tailwind-variants';
	import { onMount } from 'svelte';

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

	function springEnter(node: HTMLElement) {
		if (reducedMotion) {
			return {
				delay: 64,
				duration: 200,
				css: (t: number) => `opacity: ${t}`
			};
		}

		const k = 1000;
		const c = 48;
		const m = 1;
		const duration = 350;
		const delay = 64;

		const omega0 = Math.sqrt(k / m);
		const zeta = c / (2 * Math.sqrt(m * k));
		const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);

		return {
			delay,
			duration,
			css: (t: number) => {
				const durationSeconds = duration / 1000;
				const tSeconds = t * durationSeconds;
				const envelope = Math.exp(-zeta * omega0 * tSeconds);
				const cosTerm = Math.cos(omegaD * tSeconds);
				const sinTerm = Math.sin(omegaD * tSeconds);
				const A = -1;
				const B = -(zeta * omega0 * A) / omegaD;
				const springVal = envelope * (A * cosTerm + B * sinTerm);
				
				const scale = 1.0 + 0.1 * springVal;
				const opacity = Math.min(1, Math.max(0, t));

				return `
					opacity: ${opacity};
					transform: translate(-50%, -50%) scale(${scale});
				`;
			}
		};
	}

	function springExit(node: HTMLElement) {
		if (reducedMotion) {
			return {
				delay: 0,
				duration: 200,
				css: (t: number) => `opacity: ${t}`
			};
		}

		const k = 1200;
		const c = 80;
		const m = 1;
		const duration = 250;

		const omega0 = Math.sqrt(k / m);
		const zeta = c / (2 * Math.sqrt(m * k));
		const omegaD = omega0 * Math.sqrt(zeta * zeta - 1);

		return {
			delay: 0,
			duration,
			css: (t: number) => {
				const durationSeconds = duration / 1000;
				const tSeconds = t * durationSeconds;
				const envelope = Math.exp(-zeta * omega0 * tSeconds);
				const coshTerm = Math.cosh(omegaD * tSeconds);
				const sinhTerm = Math.sinh(omegaD * tSeconds);
				const A = -1;
				const B = -(zeta * omega0 * A) / omegaD;
				const springVal = envelope * (A * coshTerm + B * sinhTerm);

				const scale = 1.0 + 0.1 * springVal;
				const opacity = Math.min(1, Math.max(0, t));

				return `
					opacity: ${opacity};
					transform: translate(-50%, -50%) scale(${scale});
				`;
			}
		};
	}
</script>

<DialogPortal {...portalProps}>
	<DialogOverlay />
	<DialogPrimitive.Content
		bind:ref
		{...restProps}
	>
		{#snippet child({ props })}
			<div
				{...props}
				class={cn(dialogVariants({ size }), className)}
				in:springEnter
				out:springExit
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
			</div>
		{/snippet}
	</DialogPrimitive.Content>
</DialogPortal>
