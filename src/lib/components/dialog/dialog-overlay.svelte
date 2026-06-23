<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';
	import { getDialogOpenContext } from './dialog.svelte';
	import { animate } from 'motion';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.OverlayProps = $props();

	const dialogState = getDialogOpenContext();
	let overlayElement = $state<HTMLElement | null>(null);
	let isVisible = $state(false);

	$effect(() => {
		const isOpen = dialogState?.open;
		if (isOpen) {
			isVisible = true;
		} else {
			if (overlayElement && isVisible) {
				const animation = animate(overlayElement, { opacity: 0 }, { duration: 0.2 });
				animation.then(() => {
					if (!dialogState?.open) {
						isVisible = false;
					}
				});
			}
		}
	});

	$effect(() => {
		if (dialogState?.open && overlayElement) {
			animate(overlayElement, { opacity: [0, 1] }, { duration: 0.2 });
		}
	});
</script>

<DialogPrimitive.Overlay
	bind:ref
	forceMount={true}
	{...restProps}
>
	{#snippet child({ props })}
		{#if isVisible}
			<div
				{...props}
				bind:this={overlayElement}
				class={cn('fixed inset-0 z-50 bg-black/70 backdrop-blur-[1px]', className)}
			></div>
		{/if}
	{/snippet}
</DialogPrimitive.Overlay>
