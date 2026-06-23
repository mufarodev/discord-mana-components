<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.OverlayProps = $props();
</script>

<DialogPrimitive.Overlay
	bind:ref
	{...restProps}
>
	{#snippet child({ props })}
		<div
			{...props}
			class={cn('fixed inset-0 z-50 bg-black/70 backdrop-blur-[1px]', className)}
			transition:fade={{ duration: 200 }}
		></div>
	{/snippet}
</DialogPrimitive.Overlay>
